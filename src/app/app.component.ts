import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-root',
  styleUrls: [
    './app.style.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Cleaning App';

  constructor(public authService: AuthService, public userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.setAdministrator();
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout();
  }

}
