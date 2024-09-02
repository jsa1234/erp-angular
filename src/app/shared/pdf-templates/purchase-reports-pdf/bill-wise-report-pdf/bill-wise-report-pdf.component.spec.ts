import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillWiseReportPdfComponent } from './bill-wise-report-pdf.component';

describe('BillWiseReportPdfComponent', () => {
  let component: BillWiseReportPdfComponent;
  let fixture: ComponentFixture<BillWiseReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillWiseReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillWiseReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
