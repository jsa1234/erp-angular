import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePaymentMerchantComponent } from './ManagePaymentMerchantComponent';

describe('ManagePaymentMerchantComponent', () => {
  let component: ManagePaymentMerchantComponent;
  let fixture: ComponentFixture<ManagePaymentMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePaymentMerchantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePaymentMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
