import { Component, HostListener } from '@angular/core';
import { IUser } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'balagne-medical';
  public deviseSize = 'desktop';
  public currentUser: IUser;

  constructor(private authService: AuthService) {
    this.deviseSize = window.innerWidth > 990 ? 'desktop' : 'mobile';
    this.authService.currentUserChange$.subscribe((user: IUser) => this.currentUser = user);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  @HostListener('window:resize', ['$event'])
  public onResize(event): void {
    this.deviseSize = event.target.innerWidth > 990 ? 'desktop' : 'mobile';
  }
}
