import { Component, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as AppConstants from '../../constants';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class TasksService {
  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private _http: Http) {

  }


  getTasks() {
    const tasksUrl = AppConstants.apiUrl + 'tasks';

    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Authorization': 'Bearer ' + Cookie.get('access_token')});
    let options = new RequestOptions({ headers: headers });

    return this._http.get(tasksUrl, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);

    return Observable.throw(error.json().message || 'Server error');
  }
}
