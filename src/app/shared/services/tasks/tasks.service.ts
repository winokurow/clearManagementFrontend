import { Component, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

import * as AppConstants from '../../constants'
import { Task } from 'src/app/shared/types/task.model'

@Injectable()
export class TasksService {
  private apiHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) {

  }


  getTasks1(showOnlyCurrent: boolean) {
    const tasksUrl = AppConstants.apiUrl + 'tasks'
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
    let params = new HttpParams().set('show_only_current', String(showOnlyCurrent))
    
    return this._http.get<Task[]>(tasksUrl, {headers: headers, params: params})
  }

  getTasks(showOnlyCurrent: boolean, onlyAssignedToMe: boolean) {
    const taskpatternsUrl = AppConstants.apiUrl + 'tasks'
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
    let params = new HttpParams().set('show_only_current', String(showOnlyCurrent)).set('show_only_assigned_to_me', String(onlyAssignedToMe))
    
    return this._http.get<Task[]>(taskpatternsUrl, {headers: headers, params: params})
  }

  getTaskPatterns() {
    const taskpatternsUrl = AppConstants.apiUrl + 'task_patterns'
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
    return this._http.get<Task[]>(taskpatternsUrl, {headers: headers})
  }

  submitTask(id) {
    const tasksUrl = AppConstants.apiUrl + 'tasks/task/' + id + '/submit'

    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')

    return this._http.post<Task>(tasksUrl, '', {headers: headers})
  }

  updateTask(id, task) {
    const tasksUrl = AppConstants.apiUrl + 'tasks/task/' + id + '/change'

    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')

    return this._http.post<Task>(tasksUrl, task, {headers: headers})
  }

  insertTask(task) {
    const tasksUrl = AppConstants.apiUrl + 'tasks/task/create'

    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')

    return this._http.put<Task>(tasksUrl, task, {headers: headers})
  }

  deleteTask(id) {
    const tasksUrl = AppConstants.apiUrl + 'tasks/task/' + id + '/delete'

    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')

    return this._http.delete(tasksUrl, {headers: headers})
  }

  assignRandomTasks(assignTaskForm) {
    const tasksUrl = AppConstants.apiUrl + 'tasks/asignrandomtasks'

    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')

    return this._http.post<Task>(tasksUrl, assignTaskForm, {headers: headers})
  }
}
