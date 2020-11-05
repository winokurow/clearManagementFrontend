import { Component } from '@angular/core'
import { HouseholdService } from '../../shared/services/household/household.service'
import { TasksService } from '../../shared/services/tasks/tasks.service'
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { AlertService } from 'src/app/shared/alert/alert.service'
import { Router } from '@angular/router'

@Component({
  selector: 'assign-tasks',
  templateUrl: './assign-tasks.html'
})
export class AssignTasks {
  members = [];
  assignTaskForm: FormGroup;

  public errorMessage = '';
  public successMessage = '';
  
 constructor(private householdService: HouseholdService, private tasksService: TasksService, private formBuilder: FormBuilder,
    private alertService: AlertService, private _router: Router) {

  }

  ngOnInit() {    
    this.getMembers() 
    this.assignTaskForm = this.formBuilder.group({
      member: ['', []],
      minimalTotalComplexity: ['', [Validators.required]]
  })
  }

  getMembers() {
    this.householdService.getMembers(false)
        .subscribe(data => {
          if (data != null) {
            console.log(data)
            this.members = data
          }
        }, error1 => {
          let errMsg = error1
          console.log(errMsg)
          this.errorMessage = errMsg
        })


  }
  assignRandomTasks() {
    const value = { member: +this.assignTaskForm.value.member, minimalTotalComplexity: +this.assignTaskForm.value.minimalTotalComplexity }
    this.tasksService.assignRandomTasks(value)
          .subscribe(data => {
              this.errorMessage = ''
              this.successMessage = 'Tasks assigned'
          }, error => {
            this.errorMessage = error
            this.successMessage = ''
          })
    }

}
