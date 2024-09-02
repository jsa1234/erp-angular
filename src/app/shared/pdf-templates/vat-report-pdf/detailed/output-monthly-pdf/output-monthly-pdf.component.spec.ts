import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputMonthlyPdfComponent } from './output-monthly-pdf.component';

describe('OutputMonthlyPdfComponent', () => {
  let component: OutputMonthlyPdfComponent;
  let fixture: ComponentFixture<OutputMonthlyPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputMonthlyPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputMonthlyPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
