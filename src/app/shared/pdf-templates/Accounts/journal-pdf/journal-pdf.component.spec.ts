import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalPdfComponent } from './journal-pdf.component';

describe('JournalPdfComponent', () => {
  let component: JournalPdfComponent;
  let fixture: ComponentFixture<JournalPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
