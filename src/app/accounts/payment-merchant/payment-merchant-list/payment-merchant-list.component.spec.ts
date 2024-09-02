import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMerchantListComponent } from './payment-merchant-list.component';

describe('PaymentMerchantListComponent', () => {
  let component: PaymentMerchantListComponent;
  let fixture: ComponentFixture<PaymentMerchantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMerchantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMerchantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
