import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTransactionsListComponent } from './payment-transactions-list.component';

describe('PaymentTransactionsListComponent', () => {
  let component: PaymentTransactionsListComponent;
  let fixture: ComponentFixture<PaymentTransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTransactionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
