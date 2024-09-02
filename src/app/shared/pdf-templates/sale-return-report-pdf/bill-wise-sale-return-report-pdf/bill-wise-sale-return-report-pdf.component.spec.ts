import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillWiseSaleReturnReportPdfComponent } from './bill-wise-sale-return-report-pdf.component';

describe('BillWiseSaleReturnReportPdfComponent', () => {
  let component: BillWiseSaleReturnReportPdfComponent;
  let fixture: ComponentFixture<BillWiseSaleReturnReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillWiseSaleReturnReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillWiseSaleReturnReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
