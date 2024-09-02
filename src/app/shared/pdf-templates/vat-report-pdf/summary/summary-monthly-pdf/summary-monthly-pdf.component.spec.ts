import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMonthlyPdfComponent } from './summary-monthly-pdf.component';

describe('SummaryMonthlyPdfComponent', () => {
  let component: SummaryMonthlyPdfComponent;
  let fixture: ComponentFixture<SummaryMonthlyPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryMonthlyPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryMonthlyPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
