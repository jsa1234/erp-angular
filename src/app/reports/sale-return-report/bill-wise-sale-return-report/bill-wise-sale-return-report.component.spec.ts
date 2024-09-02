import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillWiseSaleReturnReportComponent } from './bill-wise-sale-return-report.component';

describe('BillWiseSaleReturnReportComponent', () => {
  let component: BillWiseSaleReturnReportComponent;
  let fixture: ComponentFixture<BillWiseSaleReturnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillWiseSaleReturnReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillWiseSaleReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
