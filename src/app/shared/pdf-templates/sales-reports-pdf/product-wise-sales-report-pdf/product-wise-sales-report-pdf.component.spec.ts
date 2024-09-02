import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWiseSalesReportPdfComponent } from './product-wise-sales-report-pdf.component';

describe('ProductWiseSalesReportPdfComponent', () => {
  let component: ProductWiseSalesReportPdfComponent;
  let fixture: ComponentFixture<ProductWiseSalesReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductWiseSalesReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWiseSalesReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
