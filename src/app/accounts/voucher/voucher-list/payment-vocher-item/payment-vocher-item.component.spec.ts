import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVocherItemComponent } from './payment-vocher-item.component';

describe('PaymentVocherItemComponent', () => {
  let component: PaymentVocherItemComponent;
  let fixture: ComponentFixture<PaymentVocherItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentVocherItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentVocherItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
