import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReportPdfComponent } from './detailed-report-pdf.component';

describe('DetailedReportPdfComponent', () => {
  let component: DetailedReportPdfComponent;
  let fixture: ComponentFixture<DetailedReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
