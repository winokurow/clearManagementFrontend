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

  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) {

  }

  isAdmin() {
     if (Cookie.check('is_admin')) {
      return Cookie.get('is_admin');
    } else {
      this.getUserInfo().subscribe((data: Role[]) => {
       let admin = data.filter(x => x.name === 'ROLE_ADMIN');
       console.log(String(admin.length === 1));
       Cookie.set('is_admin', String(admin.length === 1));
       return Cookie.get('is_admin');

    }, error => {

      }
      );
    }
    
    //this._router.navigate(['/']);
  }

  getUserInfo() {
    const tasksUrl = AppConstants.apiUrl + '/identity/userinfo';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    return this._http.get<any>(tasksUrl, {headers: headers});
  }


}
