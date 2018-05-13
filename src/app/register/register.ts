import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

import { RegistrationService } from '../shared/services/registration/registration.service';
import { RegistrationValidator } from '../shared/validation/registrationvalidator';
import { Login } from '../login/login';

@Component({
  selector: 'rg-register',
  template: require('./register.html')
})
export class Register {
  public errorMessage = '';
  public successMessage = '';

  private registerForm: FormGroup;
  private email = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])
  );
  private householdname = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])
  );
  private firstname = new FormControl(
    '',
    Validators.compose([
      Validators.required
    ])
  );
  private lastname = new FormControl(
    '',
    Validators.compose([
      Validators.required
    ])
  );
  private password = new FormControl('',
    Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      RegistrationValidator.validatePassword
    ])
  );
  private confirmpassword = new FormControl('',
  Validators.compose([
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(50),
    RegistrationValidator.validatePassword
  ])
);
  constructor(private registrationService: RegistrationService, private formBuilder: FormBuilder) {
    //this.createForm();
  }

  ngOnInit() {
    console.log('hello `Register` component');
    this.registerForm = this.formBuilder.group({
      householdname: this.householdname,
      members: this.formBuilder.array([this.initMembers()]) // here
    });
    //this.addNewMember();
  }

  register() {
    this.registrationService.registerUser(this.registerForm.value)
        .subscribe(data => {
          if (data) {
            this.errorMessage = '';
            this.successMessage = 'Account successfully created';
            //this.createForm();
          } else {
            this.errorMessage = 'Error';
            this.successMessage = '';
          }
        }, error => {
          this.errorMessage = error;
          this.successMessage = '';
        });
  }

/*  createForm() {
    this.registerForm = this.formBuilder.group({
      email:  this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      password: this.password,
      confirmpassword: this.confirmpassword
    });
  }*/

  initMembers() {
    return this.formBuilder.group({
        // list all your form controls here, which belongs to your form array
        email:  this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        confirmpassword: this.confirmpassword
    });
}
  addNewMember() {
    // control refers to your formarray
    const control = <FormArray>this.registerForm.controls['members'];
    // add new formgroup
    control.push(this.initMembers());
}

deleteMember(index: number) {
    console.log('Add new member');
    // control refers to your formarray
    const control = <FormArray>this.registerForm.controls['members'];
    // remove the chosen row
    control.removeAt(index);
}
}
