import { Component } from '@angular/core';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { Message } from 'src/app/shared/types/message';
import { HistoryService } from 'src/app/shared/services/history/history.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-statistic-selector',
  templateUrl: './user-statistic.html'
})
export class UserStatistic {

  history = [];
  noUsersMessage = '';
  errorMessage = '';

  
  fromDate = new Date();
  toDate = new Date();
  points;

  constructor(private historyService: HistoryService) {

  }

  ngOnInit() {
    console.log('hello `HistoryList` component');
    console.log(this.fromDate.toISOString());
    this.getHistory();
  }

  updateList() {
    console.log('hello `HistoryList` component');

    this.getHistory();
  }
  getHistory() {
    this.fromDate.setHours(0,0,0,0);
    this.toDate.setHours(23,59,59,999);
    this.historyService.getMemberHistory(this.fromDate, this.toDate)
        .subscribe(data => {
          if (data != null) {
            this.history = data;
            this.getPoints();
            console.log(this.history);
          } else {
            this.noUsersMessage = 'No history found';
          }
        }, error => {
          let errMsg: Message = error.error;
          this.errorMessage = errMsg.message;
        });
  }

  getPoints() {
    this.points = this.history.filter(item => item.action === 'SUBMIT').reduce((sum, current) => sum + current.complexity, 0);
  }
}
