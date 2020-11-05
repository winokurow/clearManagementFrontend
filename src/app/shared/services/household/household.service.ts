import { Component, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import * as AppConstants from '../../constants'
import { MemberShort } from '../../types/membershort'

@Injectable()
export class HouseholdService {
  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) {

  }


  getMembers(showOnlyCurrent: boolean) {
    const membersUrl = AppConstants.apiUrl + 'household/members'
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
    let params = new HttpParams().set('show_only_current', String(showOnlyCurrent))
    
    return this._http.get<MemberShort[]>(membersUrl, {headers: headers, params: params})
  }
}
