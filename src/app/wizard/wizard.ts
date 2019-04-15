import { Component } from '@angular/core';
import { Message } from 'src/app/shared/types/message';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';

@Component({
  selector: 'app-wizard-selector',
  templateUrl: './wizard.html'
})
export class Wizard {
  tasks = [];
  noUsersMessage = '';
  errorMessage = '';

  constructor(private tasksService: TasksService) {

  }

  ngOnInit() {
    console.log('Start Wizard component');
    this.getTaskPatterns();
  }

  getTaskPatterns() {
    this.tasksService.getTaskPatterns()
        .subscribe(data => {
          if (data != null) {
            this.tasks = data;
            console.log(this.tasks);
          } else {
            this.noUsersMessage = 'No tasks found';
          }
        }, error => {
          let errMsg: Message = error.error;
          this.errorMessage = errMsg.message;
        });
  }

}
