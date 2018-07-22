import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as AppConstants from '../../constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import { Role } from 'src/app/shared/types/role.model';

@Injectable()
export class UserService {


  isAdmin: boolean;

  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) {

  }

  setAdministrator() {
      if (Cookie.check('is_admin')) {
        console.log('Token is set');
        this.isAdmin = Cookie.get('is_admin') === 'true';
        console.log(this.isAdmin);
      } else {
        this.getUserInfo().subscribe((data) => {
          console.log('data' + data);
          let admin = data.filter(x => x.name === 'ROLE_ADMIN');
          Cookie.set('is_admin', String(admin.length === 1));
          console.log('New Token');
          this.isAdmin = Cookie.get('is_admin') === 'true';
          console.log(this.isAdmin);
        }, error => {
        });
      }
  }

  getUserInfo() {
    const tasksUrl = AppConstants.apiUrl + '/identity/userinfo';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    console.log('get User Info');
    return this._http.get<Role[]>(tasksUrl, {headers: headers});
  }


}
