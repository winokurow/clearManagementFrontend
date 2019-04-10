import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as AppConstants from '../constants';

@Injectable()
export class AuthService {

  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  private loggedIn = false;
  private token = '';
  private user = {
    username: '',
    token: ''
  };

  constructor(private _router: Router, private _http: Http) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.user = user;
    this.loggedIn = !!this.user && !!this.user.token;
  }

  handleError(error) {
    console.log(error.json().error_description);
    return Observable.throw(error.json().error_description || 'Server error');
  }

  obtainAccessToken(user) {
    const params = new URLSearchParams();
    params.append('username', user.email);
    params.append('password', user.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'clientapp');
    const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Authorization': 'Basic ' + btoa('clientapp:123456')});
    const options = new RequestOptions({ headers: headers });
    const registerUrl = AppConstants.apiUrl + 'oauth/token';
    return this._http.post(registerUrl, params.toString(), options)
      .map(res => res.json()).map(res => {

        if (res) {
          console.log(res);
          this.saveToken(res);
          console.log('Angemeldet');
        }
        return res;
      })
  .catch(this.handleError);
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.delete('access_token');
    Cookie.delete('refresh_token');
    Cookie.set('access_token', token.access_token, expireDate);
    Cookie.set('refresh_token', token.refresh_token, expireDate);
    console.log('Obtained Access token');
    //this._router.navigate(['/']);
  }


  checkCredentials() {
    return Cookie.check('access_token');
  }

  getAuthToken() {
    return Cookie.get('access_token');
  }
  getRefreshToken() {
    return Cookie.get('refresh_token');
  }
  logout() {
    this.deleteTokens();
    this._router.navigate(['/login']);
  }
  deleteTokens() {
    Cookie.deleteAll();
  }
  refreshToken(): Observable<string> {
    /*
        The call that goes in here will use the existing refresh token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization token for the API calls.
    */
    let refreshAuth = this.getAuthToken();
    const headers = new Headers({'refreshAuthorization': refreshAuth});
    const options = new RequestOptions({ headers: headers });

    return this._http.post('http://localhost:8080/oauth/refresh', '', options)
      .map(res => res.json()).map(res => {

        if (res) {
          console.log(res);
          this.saveToken(res);
        }
        return res;
      })
    .catch(this.handleError);
  }

}

