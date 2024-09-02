import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputYearlyQuarterlyPdfComponent } from './input-yearly-quarterly-pdf.component';

describe('InputYearlyQuarterlyPdfComponent', () => {
  let component: InputYearlyQuarterlyPdfComponent;
  let fixture: ComponentFixture<InputYearlyQuarterlyPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputYearlyQuarterlyPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputYearlyQuarterlyPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
