import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMerchantDetailComponent } from './payment-merchant-detail.component';

describe('PaymentMerchantDetailComponent', () => {
  let component: PaymentMerchantDetailComponent;
  let fixture: ComponentFixture<PaymentMerchantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMerchantDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMerchantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
