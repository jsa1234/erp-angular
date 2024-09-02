import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoicePdfComponent } from './purchase-invoice-pdf.component';

describe('PurchaseInvoicePdfComponent', () => {
  let component: PurchaseInvoicePdfComponent;
  let fixture: ComponentFixture<PurchaseInvoicePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInvoicePdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInvoicePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
