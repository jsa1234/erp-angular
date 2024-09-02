import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGstPdfComponent } from './summary-gst-pdf.component';

describe('SummaryGstPdfComponent', () => {
  let component: SummaryGstPdfComponent;
  let fixture: ComponentFixture<SummaryGstPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryGstPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryGstPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
