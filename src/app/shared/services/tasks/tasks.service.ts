import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as AppConstants from '../../constants';

@Injectable()
export class TasksService {
  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) {

  }


  getTasks() {
    const tasksUrl = AppConstants.apiUrl + 'tasks';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    return this._http.get<Task[]>(tasksUrl, {headers: headers});
  }

  submitTask(id) {
    const tasksUrl = AppConstants.apiUrl + 'task/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

    return this._http.post<Task>(tasksUrl, '', {headers: headers});
  }
}
