import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { IUser } from './models/user';
import { AuthService } from './services/auth.service';
import { URLS } from '../assets/images/urls-to-preload';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { INotification } from './models/notification';
import { UserInterfaceService } from './services/user-interface.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'balagne-medical';
  public deviseSize = 'desktop';
  public currentUser: IUser;
  private deviseLimitInPx = 1095;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userInterfaceService: UserInterfaceService) {
    this.preloadImages(URLS);

    this.deviseSize = window.innerWidth > this.deviseLimitInPx ? 'desktop' : 'mobile';
   const subscription = this.authService.currentUserChange$.subscribe((user: IUser) => this.currentUser = user);

    const subscription2 = this.userInterfaceService.notificationEvent$.subscribe(
      (notifData: INotification) => this.openNotification(notifData)
    );
    this.subscription.add(subscription);
    this.subscription.add(subscription2);
  }

  public shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  public ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  @HostListener('window:resize', ['$event'])
  public onResize(event): void {
    this.deviseSize = event.target.innerWidth > this.deviseLimitInPx ? 'desktop' : 'mobile';
  }

  private preloadImages(urls: string[]): void {
    for (const url of urls) {
      const img = new Image();
      img.src = url;
    }
  }

  public openNotification(notifData: INotification): void {
    this._snackBar.open(notifData.message, null, {
      duration: 10000,
      panelClass: [notifData.type],
      data: notifData
    });
  }

  public onLogout(): void {
    this.authService.doLogoutUser('pharmacies');
    this.userInterfaceService.success('Déconnecté!');
  }
}
