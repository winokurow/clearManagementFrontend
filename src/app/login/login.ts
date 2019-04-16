import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Message } from '../shared/types/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.html'
})
export class Login {
  public errorMessage = '';
  public successMessage = '';

  public form: FormGroup;
  public email = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);

  constructor(private authService: AuthService, private userService: UserService,
    private formBuilder: FormBuilder, private router: Router) {
    authService.deleteTokens();
    this.createForm();
  }

  ngOnInit() {
    console.log('hello `Login` component');
  }

  login() {
    this.authService.obtainAccessToken(this.form.value)
        .subscribe(data => {
          console.log(data);
          if (data) {
            this.userService.setAdministrator();
            this.errorMessage = '';
            this.successMessage = 'Login successful';
            this.router.navigate(['tasks/taskslist']);
          } else {
            this.errorMessage = 'Error';
            this.successMessage = '';
          }
        }, error => {
          let errMsg = error;
          console.log(errMsg);
          this.errorMessage = errMsg;
          this.successMessage = '';
        });
  }

  createForm() {
    this.form = this.formBuilder.group({
      email:  this.email,
      password: this.password
    });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
