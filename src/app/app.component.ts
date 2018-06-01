import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: [
    './app.style.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Cleaning App';

  //constructor(private authService: AuthService, private router: Router) {
  constructor(private authService: AuthService, private router: Router) {
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout();
  }
}
