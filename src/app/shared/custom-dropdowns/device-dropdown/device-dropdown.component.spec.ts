import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDropdownComponent } from './device-dropdown.component';

describe('DeviceDropdownComponent', () => {
  let component: DeviceDropdownComponent;
  let fixture: ComponentFixture<DeviceDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
