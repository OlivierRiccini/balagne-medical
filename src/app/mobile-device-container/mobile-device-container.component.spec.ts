import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDeviceContainerComponent } from './mobile-device-container.component';

describe('MobileDeviceContainerComponent', () => {
  let component: MobileDeviceContainerComponent;
  let fixture: ComponentFixture<MobileDeviceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDeviceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDeviceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
