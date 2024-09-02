import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillWisePurchaseReturnReportPdfComponent } from './bill-wise-purchase-return-report-pdf.component';

describe('BillWisePurchaseReturnReportPdfComponent', () => {
  let component: BillWisePurchaseReturnReportPdfComponent;
  let fixture: ComponentFixture<BillWisePurchaseReturnReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillWisePurchaseReturnReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillWisePurchaseReturnReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
