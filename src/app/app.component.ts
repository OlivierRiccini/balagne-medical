import { Component, HostListener, OnInit } from '@angular/core';
import { IUser } from './models/user';
import { AuthService } from './services/auth.service';
import { URLS } from '../assets/images/urls-to-preload';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'balagne-medical';
  public deviseSize = 'desktop';
  public currentUser: IUser;
  private deviseLimitInPx = 1095;

  constructor(private authService: AuthService, private router: Router) {
    this.preloadImages(URLS);

    this.deviseSize = window.innerWidth > this.deviseLimitInPx ? 'desktop' : 'mobile';
    this.authService.currentUserChange$.subscribe((user: IUser) => this.currentUser = user);
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
}
