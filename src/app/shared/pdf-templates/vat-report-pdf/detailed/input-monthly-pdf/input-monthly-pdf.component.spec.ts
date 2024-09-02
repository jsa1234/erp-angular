import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMonthlyPdfComponent } from './input-monthly-pdf.component';

describe('InputMonthlyPdfComponent', () => {
  let component: InputMonthlyPdfComponent;
  let fixture: ComponentFixture<InputMonthlyPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMonthlyPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMonthlyPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
