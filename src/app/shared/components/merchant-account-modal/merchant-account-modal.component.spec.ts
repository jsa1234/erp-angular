import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAccountModalComponent } from './merchant-account-modal.component';

describe('MerchantAccountModalComponent', () => {
  let component: MerchantAccountModalComponent;
  let fixture: ComponentFixture<MerchantAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantAccountModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
