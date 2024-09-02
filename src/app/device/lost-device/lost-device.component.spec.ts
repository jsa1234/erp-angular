import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostDeviceComponent } from './lost-device.component';

describe('LostDeviceComponent', () => {
  let component: LostDeviceComponent;
  let fixture: ComponentFixture<LostDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
