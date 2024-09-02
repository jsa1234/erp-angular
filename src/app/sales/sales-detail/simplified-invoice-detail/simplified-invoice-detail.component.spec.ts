import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplifiedInvoiceDetailComponent } from './simplified-invoice-detail.component';

describe('SimplifiedInvoiceDetailComponent', () => {
  let component: SimplifiedInvoiceDetailComponent;
  let fixture: ComponentFixture<SimplifiedInvoiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplifiedInvoiceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplifiedInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
