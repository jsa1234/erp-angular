import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStockReportPdfComponent } from './general-stock-report-pdf.component';

describe('GeneralStockReportPdfComponent', () => {
  let component: GeneralStockReportPdfComponent;
  let fixture: ComponentFixture<GeneralStockReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralStockReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStockReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
