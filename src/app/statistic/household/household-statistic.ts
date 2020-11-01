import { Component } from '@angular/core';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { Message } from 'src/app/shared/types/message';
import { HistoryService } from 'src/app/shared/services/history/history.service';

@Component({
  selector: 'app-household-statistic-selector',
  templateUrl: './household-statistic.html'
})
export class HouseholdStatistic {

  history = [];
  noUsersMessage = '';
  errorMessage = '';

  fromDate = new Date();
  toDate = new Date();
  pointsMap = new Map<string, number>();

  constructor(private historyService: HistoryService) {

  }

  ngOnInit() {
    console.log('hello `HistoryList` component');
    this.getHistory();
  }

  updateList() {
    this.getHistory();
  }

  getHistory() {
    this.fromDate.setHours(0,0,0,0);
    this.toDate.setHours(23,59,59,999);
    this.historyService.getHouseholdHistory(this.fromDate, this.toDate)
        .subscribe(data => {
          if (data != null) {
            this.history = data;
            console.log(this.history);
            this.getPoints();
          } else {
            this.noUsersMessage = 'No history found';
          }
        }, error => {
          this.errorMessage = error;
        });
  }

  getPoints() {
    for (let value of this.history) {
      if (value.action === 'SUBMIT') {
        if (!(this.pointsMap.has(value.member))) {
          this.pointsMap.set(value.member, 0);
          console.log(this.pointsMap);
        }
        let point = this.pointsMap.get(value.member) + value.complexity;
        console.log(point);
        this.pointsMap.set(value.member, point);
      }

    }
  }
}


