import { Component, HostListener } from '@angular/core';
import { IUser } from './models/user';
import { AuthService } from './services/auth.service';
import { URLS } from '../assets/images/urls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'balagne-medical';
  public deviseSize = 'desktop';
  public currentUser: IUser;
  private deviseLimitInPx = 1095;

  constructor(private authService: AuthService) {
    this.preloadImages(URLS);

    this.deviseSize = window.innerWidth > this.deviseLimitInPx ? 'desktop' : 'mobile';
    this.authService.currentUserChange$.subscribe((user: IUser) => this.currentUser = user);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  @HostListener('window:resize', ['$event'])
  public onResize(event): void {
    this.deviseSize = event.target.innerWidth > this.deviseLimitInPx ? 'desktop' : 'mobile';
  }

  private preloadImages(urls: string[]): void {
    for (const url of urls) {
      const img = new Image();
      img.src = url;
      console.log(img);
    }
  }
}
