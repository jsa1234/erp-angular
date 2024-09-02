import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceiptItemComponent } from './payment-receipt-item.component';

describe('PaymentReceiptItemComponent', () => {
  let component: PaymentReceiptItemComponent;
  let fixture: ComponentFixture<PaymentReceiptItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentReceiptItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReceiptItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
