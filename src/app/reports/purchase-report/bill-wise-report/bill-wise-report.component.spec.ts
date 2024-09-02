import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillWiseReportComponent } from './bill-wise-report.component';

describe('BillWiseReportComponent', () => {
  let component: BillWiseReportComponent;
  let fixture: ComponentFixture<BillWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillWiseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
