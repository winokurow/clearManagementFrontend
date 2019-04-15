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

  constructor(private historyService: HistoryService) {

  }

  ngOnInit() {
    console.log('hello `HistoryList` component');
    this.getHistory();
  }

  getHistory() {
    this.historyService.getHouseholdHistory()
        .subscribe(data => {
          if (data != null) {
            this.history = data;
            console.log(this.history);
          } else {
            this.noUsersMessage = 'No history found';
          }
        }, error => {
          this.errorMessage = error;
        });
  }
}
