import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryYearlyQuarterlyPdfComponent } from './summary-yearly-quarterly-pdf.component';

describe('SummaryYearlyQuarterlyPdfComponent', () => {
  let component: SummaryYearlyQuarterlyPdfComponent;
  let fixture: ComponentFixture<SummaryYearlyQuarterlyPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryYearlyQuarterlyPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryYearlyQuarterlyPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
