import { Component } from '@angular/core';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Task } from 'src/app/shared/types/task.model';
import { ConfirmationDialog } from '../../shared/delete-task-confirm-dialog/confirmation-dialog';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-tasks-administration',
  template: require('./tasks-administration.html')
})
export class TasksAdministration {
  tasks = [];
  noUsersMessage = '';
  public errorMessage = '';
  public successMessage = '';
  tasksForm: FormGroup;
  newTaskForm: FormGroup;
  constructor(private tasksService: TasksService, private formBuilder: FormBuilder, 
    private alertService: AlertService) {

  }

  ngOnInit() {
    console.log('hello `Tasks Administrator` component');
    let displayDate = new Date().toISOString();
    this.newTaskForm = this.formBuilder.group({
        groupname: ['', [Validators.required]],
        description: ['', []],
        name: ['', [Validators.required]],
        shedule: ['P3Y2M2W3D', [Validators.required]],
        nextRun: [displayDate, [Validators.required]],
        priority: ['', [Validators.required]],
        complexity: ['', [Validators.required]]
    });
    this.getTasks();

  }

  getTasks() {
    this.tasksService.getTasks(false)
        .subscribe(data => {
          if (data != null) {
            this.tasks = data;
            this.tasksForm = new FormGroup({
              tasks: new FormArray(this.tasks.map(item => {
                const group = this.createTasks(item);
                group.patchValue(item);
                group.valueChanges.subscribe(val => {
                  console.log('Update');
                  let task = val as Task;
                  console.log('val=' + task);
                  this.tasksService.upadateTask(val.id, val).subscribe(data1 => {
                  }, error => {
                    this.errorMessage = error;
                  });
                });
                return group;
              }))
            });
          } else {
            this.noUsersMessage = 'No tasks found';
          }
        }, error => {
          this.errorMessage = error;
        });
  }

  createTasks(task: any) {
   let group = this.formBuilder.group({
        // list all your form controls here, which belongs to your form array
        id: [task.id || '', []],
        groupname: [task.groupname || '', [Validators.required]],
        description: [task.description || '', []],
        name: [task.name || '', [Validators.required]],
        shedule: [task.shedule || '', [Validators.required]],
        nextRun: [task.nextRun || '', [Validators.required]],
        priority: [task.priority || '', [Validators.required]],
        complexity: [task.complexity || '', [Validators.required]]
    }, { updateOn: 'blur' });

    return group;
  }

  submitForm() {

  }

  insertTask() {
  this.tasksService.insertTask(this.newTaskForm.value)
        .subscribe(data => {
            this.errorMessage = '';
            this.successMessage = 'Task successfully created';
            this.tasks.push(data);
            let control = <FormArray>this.tasksForm.controls['tasks'];
            control.push(this.createTasks(data));
            this.newTaskForm.reset();
            let displayDate = new Date().toISOString();
            this.newTaskForm.patchValue({
              shedule: 'P3Y2M2W3D',
              nextRun: displayDate
            });
        }, error => {
          this.errorMessage = error;
          this.successMessage = '';
        });
  }

  deleteRow(index: number) {
    let that = this;
    this.alertService.confirmThis('You sure Bro?', function() {
      let arrayControl = that.tasksForm.get('tasks') as FormArray;
      const id = arrayControl.at(index).get('id').value;
      console.log('ttttttttttttttest11' + id);
      that.tasksService.deleteTask(id)
      .subscribe(data => {
        that.errorMessage = '';
        that.successMessage = 'Task successfully delete';
        that.tasks.splice(index);
        (<FormArray>that.tasksForm.get('tasks')).removeAt(index);
      }, error => {
        that.errorMessage = error;
        that.successMessage = '';
      });
    }, function() {});
  }

}
