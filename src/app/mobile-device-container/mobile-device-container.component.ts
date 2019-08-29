import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-device-container',
  templateUrl: './mobile-device-container.component.html',
  styleUrls: ['./mobile-device-container.component.scss']
})
export class MobileDeviceContainerComponent implements OnInit {
  public opened: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
