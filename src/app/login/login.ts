import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'rg-login',
  templateUrl: './login.html'
})
export class Login {
  public errorMessage = '';
  public successMessage = '';

  private form: FormGroup;
  private email = new FormControl('', Validators.required);
  private password = new FormControl('', Validators.required);

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
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
            this.errorMessage = '';
            this.successMessage = 'Login successful';
            this.router.navigate(['tasks/taskslist']);
          } else {
            this.errorMessage = 'Error';
            this.successMessage = '';
          }
        }, error => {
          this.errorMessage = error;
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
