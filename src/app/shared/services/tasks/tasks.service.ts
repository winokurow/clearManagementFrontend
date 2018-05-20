import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as AppConstants from '../../constants';

@Injectable()
export class TasksService {
  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {

  }

  getTasks(household) {
    const tasksUrl = AppConstants.apiUrl + 'tasks/household/' + household;

    return this.http.get(tasksUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);

    return Observable.throw(error.json().message || 'Server error');
  }
}
