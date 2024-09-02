import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyActivityReportPdfComponent } from './daily-activity-report-pdf.component';

describe('DailyActivityReportPdfComponent', () => {
  let component: DailyActivityReportPdfComponent;
  let fixture: ComponentFixture<DailyActivityReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyActivityReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyActivityReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
