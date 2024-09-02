import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillWiseSalesReportPdfComponent } from './bill-wise-sales-report-pdf.component';

describe('BillWiseSalesReportPdfComponent', () => {
  let component: BillWiseSalesReportPdfComponent;
  let fixture: ComponentFixture<BillWiseSalesReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillWiseSalesReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillWiseSalesReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
