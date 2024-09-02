import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnItemComponent } from './purchase-return-item.component';

describe('PurchaseReturnItemComponent', () => {
  let component: PurchaseReturnItemComponent;
  let fixture: ComponentFixture<PurchaseReturnItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReturnItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
