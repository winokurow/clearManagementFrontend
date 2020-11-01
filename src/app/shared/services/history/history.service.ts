import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as AppConstants from '../../constants';
import { TaskHistory } from 'src/app/shared/types/task.history.model';

@Injectable()
export class HistoryService {
  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) {

  }


  getMemberHistory(from: Date, to: Date) {
    const historyUrl = AppConstants.apiUrl + 'member_history';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    let params = new HttpParams().set('dateFrom', from.toISOString()).set('dateTo', to.toISOString());

    return this._http.get<TaskHistory[]>(historyUrl, {headers: headers, params: params});
  }

  getHouseholdHistory(from: Date, to: Date) {
    const historyUrl = AppConstants.apiUrl + 'household_history';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    let params = new HttpParams().set('dateFrom', from.toISOString()).set('dateTo', to.toISOString());
    return this._http.get<TaskHistory[]>(historyUrl, {headers: headers, params: params});
  }
}
