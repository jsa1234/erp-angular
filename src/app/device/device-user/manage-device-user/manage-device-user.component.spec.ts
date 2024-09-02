import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeviceUserComponent } from './manage-device-user.component';

describe('ManageDeviceUserComponent', () => {
  let component: ManageDeviceUserComponent;
  let fixture: ComponentFixture<ManageDeviceUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDeviceUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDeviceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
