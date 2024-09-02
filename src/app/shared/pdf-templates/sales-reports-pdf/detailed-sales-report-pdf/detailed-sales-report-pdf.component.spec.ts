import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSalesReportPdfComponent } from './detailed-sales-report-pdf.component';

describe('DetailedSalesReportPdfComponent', () => {
  let component: DetailedSalesReportPdfComponent;
  let fixture: ComponentFixture<DetailedSalesReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedSalesReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSalesReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
