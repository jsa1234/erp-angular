import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUserPermissionPresentationComponent } from './device-user-permission-presentation.component';

describe('DeviceUserPermissionPresentationComponent', () => {
  let component: DeviceUserPermissionPresentationComponent;
  let fixture: ComponentFixture<DeviceUserPermissionPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceUserPermissionPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceUserPermissionPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
