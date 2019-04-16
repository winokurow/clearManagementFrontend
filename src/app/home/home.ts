import { Component } from '@angular/core';

import { Login } from '../login/login';
import { TasksList } from '../tasks/tasks-list/tasks-list';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class Home {
  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }

}
