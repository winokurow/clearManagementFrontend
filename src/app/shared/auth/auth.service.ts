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
    console.error(error);

    return Observable.throw(error.json().message || 'Server error');
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

    return this._http.post('http://localhost:8080/oauth/token', params.toString(), options)
      .map(res => res.json()).map(res => {

        if (res) {
          console.log(res);
          
          this.saveToken(res);
        }
        return res;
      })
  .catch(this.handleError);
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    console.log('Obtained Access token');
    //this._router.navigate(['/']);
  }


  checkCredentials() {
    return Cookie.check('access_token');
  }

  logout() {
    Cookie.delete('access_token');
   this._router.navigate(['/login']);
  }
}

