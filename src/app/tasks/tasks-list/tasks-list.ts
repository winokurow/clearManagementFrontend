import { Component } from '@angular/core';
import { TasksService } from '../../shared/services/tasks/tasks.service';

@Component({
  selector: 'rg-tasks-list',
  template: require('./tasks-list.html')
})
export class TasksList {
  tasks = [];
  noUsersMessage = '';
  errorMessage = '';

  constructor(private tasksService: TasksService) {

  }

  ngOnInit() {
    console.log('hello `TasksList` component');
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTasks(1)
        .subscribe(data => {
          if (data.length) {
            this.tasks = data;
          } else {
            this.noUsersMessage = 'No tasks found';
          }
        }, error => {
          this.errorMessage = error;
        });
  }

}