import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePurchaseReturnComponent } from './manage-purchase-return.component';

describe('ManagePurchaseReturnComponent', () => {
  let component: ManagePurchaseReturnComponent;
  let fixture: ComponentFixture<ManagePurchaseReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePurchaseReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
