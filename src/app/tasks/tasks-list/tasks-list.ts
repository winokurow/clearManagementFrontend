import { Component } from '@angular/core'
import {Sort} from '@angular/material/sort'
import { TasksService } from '../../shared/services/tasks/tasks.service'
import { Message } from 'src/app/shared/types/message'

@Component({
  selector: 'rg-tasks-list',
  templateUrl: './tasks-list.html'
})
export class TasksList {
  tasks = [];
  noUsersMessage = '';
  errorMessage = '';
  onlyAssignedToMe=false;

  constructor(private tasksService: TasksService) {

  }

  ngOnInit() {
    console.log('hello `TasksList` component')
    this.getTasks()
  }

 
  updateList() {
    this.getTasks()
  }
  getTasks() {
    this.tasksService.getTasks(true, this.onlyAssignedToMe)
        .subscribe(data => {
          if (data != null) {
            data.sort((a, b) => { return compare(a.priority, b.priority, true) }) 
            this.tasks = data
            console.log(this.tasks)
          } else {
            this.noUsersMessage = 'No tasks found'
          }
        }, error => {
          let errMsg: Message = error.error
          this.errorMessage = errMsg.message
        })
  }

  submitTask(id: number) {
    this.tasksService.submitTask(this.tasks[id].id)
    .subscribe(data => {
      console.log('task: ' + data.name)
      this.tasks.splice(id, 1)
    }, error => {
      let errMsg: Message = error.error
      this.errorMessage = errMsg.message
    })
  }

  sortData(sort: Sort) {
  const data = this.tasks.slice()
  if (!sort.active || sort.direction === '') {
    return
  }

  this.tasks = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc'
    switch (sort.active) {
      case 'group': return compare(a.groupname, b.groupname, isAsc)
      case 'name': return compare(a.name, b.name, isAsc)
      case 'priority': return compare(a.priority, b.priority, isAsc)
      case 'complexity': return compare(a.complexity, b.complexity, isAsc)
      default: return 0
    }
  })
}

}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}