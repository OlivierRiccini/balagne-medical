import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopDeviceContainerComponent } from './desktop-device-container.component';

describe('DesktopDeviceContainerComponent', () => {
  let component: DesktopDeviceContainerComponent;
  let fixture: ComponentFixture<DesktopDeviceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopDeviceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopDeviceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
