import { Component } from '@angular/core';

import { Login } from '../login/login';
import { TasksList } from '../tasks/tasks-list/tasks-list';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'rg-home',
  template: require('./home.html')
})
export class Home {
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

}