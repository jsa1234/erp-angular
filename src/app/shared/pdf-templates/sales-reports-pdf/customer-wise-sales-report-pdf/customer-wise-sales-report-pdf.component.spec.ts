import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseSalesReportPdfComponent } from './customer-wise-sales-report-pdf.component';

describe('CustomerWiseSalesReportPdfComponent', () => {
  let component: CustomerWiseSalesReportPdfComponent;
  let fixture: ComponentFixture<CustomerWiseSalesReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerWiseSalesReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWiseSalesReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
