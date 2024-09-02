import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPurchaseReturnReportPdfComponent } from './detailed-purchase-return-report-pdf.component';

describe('DetailedPurchaseReturnReportPdfComponent', () => {
  let component: DetailedPurchaseReturnReportPdfComponent;
  let fixture: ComponentFixture<DetailedPurchaseReturnReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedPurchaseReturnReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedPurchaseReturnReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
