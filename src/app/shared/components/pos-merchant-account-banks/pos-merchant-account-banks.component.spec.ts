import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosMerchantAccountBanksComponent } from './pos-merchant-account-banks.component';

describe('PosMerchantAccountBanksComponent', () => {
  let component: PosMerchantAccountBanksComponent;
  let fixture: ComponentFixture<PosMerchantAccountBanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosMerchantAccountBanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosMerchantAccountBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
