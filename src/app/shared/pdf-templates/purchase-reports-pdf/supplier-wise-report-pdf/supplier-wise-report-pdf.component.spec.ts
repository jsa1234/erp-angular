import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierWiseReportPdfComponent } from './supplier-wise-report-pdf.component';

describe('SupplierWiseReportPdfComponent', () => {
  let component: SupplierWiseReportPdfComponent;
  let fixture: ComponentFixture<SupplierWiseReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierWiseReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierWiseReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
