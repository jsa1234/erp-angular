import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputYearlyQuarterlyPdfComponent } from './output-yearly-quarterly-pdf.component';

describe('OutputYearlyQuarterlyPdfComponent', () => {
  let component: OutputYearlyQuarterlyPdfComponent;
  let fixture: ComponentFixture<OutputYearlyQuarterlyPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputYearlyQuarterlyPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputYearlyQuarterlyPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
