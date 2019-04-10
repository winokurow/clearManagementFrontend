import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Household } from 'src/app/shared/types/household';
import * as AppConstants from '../../constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../../types/message';


@Injectable()
export class RegistrationService {
  private apiHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {

  }

  registerHousehold(user: any) {
    const registerUrl = AppConstants.apiUrl + 'register';

    let body = JSON.stringify(user);
    console.log (JSON.stringify(body));
    return this.http.put(registerUrl, body, { headers: this.apiHeaders });
  }
}
