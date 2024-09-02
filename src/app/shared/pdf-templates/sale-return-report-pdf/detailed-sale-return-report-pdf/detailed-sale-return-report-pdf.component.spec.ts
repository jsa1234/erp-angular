import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSaleReturnReportPdfComponent } from './detailed-sale-return-report-pdf.component';

describe('DetailedSaleReturnReportPdfComponent', () => {
  let component: DetailedSaleReturnReportPdfComponent;
  let fixture: ComponentFixture<DetailedSaleReturnReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedSaleReturnReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSaleReturnReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
