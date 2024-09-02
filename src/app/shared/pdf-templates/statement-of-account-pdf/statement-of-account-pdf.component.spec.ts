import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOfAccountPdfComponent } from './statement-of-account-pdf.component';

describe('StatementOfAccountPdfComponent', () => {
  let component: StatementOfAccountPdfComponent;
  let fixture: ComponentFixture<StatementOfAccountPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementOfAccountPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementOfAccountPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
