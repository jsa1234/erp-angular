import { TestBed } from '@angular/core/testing';

import { PaymentMerchantService } from './payment-merchant.service';

describe('PaymentMerchantService', () => {
  let service: PaymentMerchantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentMerchantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
