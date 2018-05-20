import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from '../shared/services/registration/registration.service';
import { RegistrationValidator } from '../shared/validation/registrationvalidator';
import { PasswordValidation } from '../shared/validation/passwordvalidation';
import { Login } from '../login/login';

@Component({
  moduleId: module.id,
  selector: 'rg-register',
  template: require('./register.html')
})
export class Register {
  public errorMessage = '';
  public successMessage = '';

  registerForm: FormGroup;
  public admincount = 0;
  private householdname = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])
);

  constructor(private registrationService: RegistrationService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    console.log('hello `Register` component');
    this.registerForm = this.formBuilder.group({
      householdname: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      members: this.formBuilder.array([this.initMembers()]) // here
    });
  }

  register() {
    console.log('SUBMIT');
    console.log(this.admincount);

    if (this.admincount <= 0) {
      this.errorMessage = 'Please insert at least one administrator';
      this.successMessage = '';
      return;
    }

    this.registrationService.registerUser(this.registerForm.value)
        .subscribe(data => {
          if (data) {
            this.errorMessage = '';
            this.successMessage = 'Account successfully created';
          } else {
            this.errorMessage = 'Error';
            this.successMessage = '';
          }
        }, error => {
          this.errorMessage = error;
          this.successMessage = '';
        });
  }

  handleChange(event) {
    console.log('ONCHANGE');
    if (event.target.checked === true) {
      this.admincount++;
      console.log('++');
    }else {
      this.admincount--;
      console.log('--');
   }
   console.log('ONCHANGE');
   console.log(this.admincount);
  }
  initMembers() {

    return this.formBuilder.group({
        // list all your form controls here, which belongs to your form array
        email: ['', [Validators.required, Validators.minLength(5)]],
        firstname: ['', Validators.required],
        lastname: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5),
          Validators.maxLength(50), RegistrationValidator.validatePassword]],
        confirmpassword: ['', [Validators.required, Validators.minLength(5),
          Validators.maxLength(50), RegistrationValidator.validatePassword]],
        isAdmin: [false, null]
    },
    {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  addNewMember() {
    // control refers to your formarray
    const control = <FormArray>this.registerForm.get('members');
    // add new formgroup
    control.push(this.initMembers());
}

  deleteMember(index: number) {
    // control refers to your formarray
    const control = <FormArray>this.registerForm.get('members');
    // remove the chosen row
    control.removeAt(index);
  }
}
