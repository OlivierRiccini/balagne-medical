import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthAdminGuardActivate implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['admin-dashboard', 'auth']);
      return false;
    }
    if (this.authService.tokenIsExpired()) {
      this.authService.refreshToken().subscribe(
        () => {
          return true;
        },
        (err) => {
          this.authService.doLogoutUser('admin-dashboard');
          return false;
        }
      );
    }
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['admin-dashboard', 'auth']);
      return false;
    }
  }

}
