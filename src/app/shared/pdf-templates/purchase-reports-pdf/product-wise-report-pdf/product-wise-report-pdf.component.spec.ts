import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWiseReportPdfComponent } from './product-wise-report-pdf.component';

describe('ProductWiseReportPdfComponent', () => {
  let component: ProductWiseReportPdfComponent;
  let fixture: ComponentFixture<ProductWiseReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductWiseReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWiseReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
