import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePosDeviceComponent } from './manage-pos-device.component';

describe('ManagePosDeviceComponent', () => {
  let component: ManagePosDeviceComponent;
  let fixture: ComponentFixture<ManagePosDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePosDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePosDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
