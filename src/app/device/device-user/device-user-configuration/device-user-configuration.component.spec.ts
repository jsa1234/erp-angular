import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUserConfigurationComponent } from './device-user-configuration.component';

describe('DeviceUserConfigurationComponent', () => {
  let component: DeviceUserConfigurationComponent;
  let fixture: ComponentFixture<DeviceUserConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceUserConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceUserConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
