import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillWiseSalesReportComponent } from './bill-wise-sales-report.component';

describe('BillWiseSalesReportComponent', () => {
  let component: BillWiseSalesReportComponent;
  let fixture: ComponentFixture<BillWiseSalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillWiseSalesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillWiseSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
