import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosMerchantAccountDevicesComponent } from './pos-merchant-account-devices.component';

describe('PosMerchantAccountDevicesComponent', () => {
  let component: PosMerchantAccountDevicesComponent;
  let fixture: ComponentFixture<PosMerchantAccountDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosMerchantAccountDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosMerchantAccountDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
