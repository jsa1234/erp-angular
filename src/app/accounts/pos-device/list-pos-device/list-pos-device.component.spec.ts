import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPosDeviceComponent } from './list-pos-device.component';

describe('ListPosDeviceComponent', () => {
  let component: ListPosDeviceComponent;
  let fixture: ComponentFixture<ListPosDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPosDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPosDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
