import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWiseStockReportPdfComponent } from './product-wise-stock-report-pdf.component';

describe('ProductWiseStockReportPdfComponent', () => {
  let component: ProductWiseStockReportPdfComponent;
  let fixture: ComponentFixture<ProductWiseStockReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductWiseStockReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWiseStockReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
