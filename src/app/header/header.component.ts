import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // @ViewChild('navbar', {static: false}) private navBarEl: ElementRef;
  // @ViewChild('contactHeader', {static: false}) private contactHeaderEl: ElementRef;
  // private navBasePosition: number;
  // public shoudlBeSticky = false;

  // constructor() { }

  // ngAfterViewInit() {
  //   this.navBasePosition = this.navBarEl.nativeElement.offsetTop;
  // }

  // @HostListener('window:scroll', ['$event'])
  //   public doSomething(): void {
  //     if (window.pageYOffset > this.navBasePosition) {
  //       this.shoudlBeSticky = true;
  //     }
  //     if (window.pageYOffset < this.navBasePosition) {
  //       this.shoudlBeSticky = false;
  //     }
  //   }

}
