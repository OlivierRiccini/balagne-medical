import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, UrlSegment, Route, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
 
@Injectable()
export class AuthGuardLoad implements CanLoad {
    
    constructor(private authService: AuthService, private router: Router) {}

    canLoad(
        route: Route,
        segments: UrlSegment[]
      ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isLoggedIn()) {
          // this.router.navigate(['/signup']);
          alert('Non identifié');
        }
        return this.authService.isLoggedIn();
      }
 
}

@Injectable()
export class AuthGuardActivate implements CanActivate {
  private previousUrl: string = '';
    
    constructor(private authService: AuthService, private router: Router) {
      this.previousUrl = this.router.routerState.snapshot.url;
      this.router.events
        .subscribe(event => {
          if (event instanceof NavigationEnd) {
            this.previousUrl = event.url;
          }
      });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['auth']);
        // this.router.navigate([this.previousUrl]);
        // alert('Non identifié');
        // console.log(route.url)
      }
      return this.authService.isLoggedIn();
    }
 
}