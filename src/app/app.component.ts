import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'balagne-medical';
  public deviseSize: string = 'desktop';

  constructor() {
    this.deviseSize = window.innerWidth > 990 ? 'desktop' : 'mobile';
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.deviseSize = event.target.innerWidth > 990 ? 'desktop' : 'mobile';
    console.log(event.target.innerWidth);
  }
}
