import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPosDeviceComponent } from './detail-pos-device.component';

describe('DetailPosDeviceComponent', () => {
  let component: DetailPosDeviceComponent;
  let fixture: ComponentFixture<DetailPosDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPosDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPosDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
