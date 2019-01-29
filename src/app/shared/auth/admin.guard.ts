import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  canActivate() {
    if (this.authService.checkCredentials()) {
      if (this.userService.isAdmin) {
        return true;
      } else {
        this.router.navigate(['home']);
        return false;
      }
    }

    this.router.navigate(['login']);
    return false;
  }
}
