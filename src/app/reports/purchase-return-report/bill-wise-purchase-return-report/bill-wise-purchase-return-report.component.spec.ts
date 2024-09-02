import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillWisePurchaseReturnReportComponent } from './bill-wise-purchase-return-report.component';

describe('BillWisePurchaseReturnReportComponent', () => {
  let component: BillWisePurchaseReturnReportComponent;
  let fixture: ComponentFixture<BillWisePurchaseReturnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillWisePurchaseReturnReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillWisePurchaseReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
