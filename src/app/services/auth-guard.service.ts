import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, UrlSegment, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardLoad implements CanLoad {

    constructor(private authService: AuthService, private router: Router) {}

    canLoad(
        route: Route,
        segments: UrlSegment[]
      ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isLoggedIn() || this.authService.tokenIsExpired()) {
          // this.router.navigate(['/signup']);
          alert('Non identifié');
        }
        return this.authService.isLoggedIn();
      }

}

@Injectable()
export class AuthGuardActivate implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['pharmacies', 'auth']);
      return false;
    }
    if (this.authService.tokenIsExpired()) {
      this.authService.refreshToken().subscribe(
        () => {
          return true;
        },
        (err) => {
          this.authService.doLogoutUser();
          return false;
        }
      );
    }
    return true;
  }

}
