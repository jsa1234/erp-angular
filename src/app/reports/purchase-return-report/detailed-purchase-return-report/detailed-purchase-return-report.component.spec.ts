import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPurchaseReturnReportComponent } from './detailed-purchase-return-report.component';

describe('DetailedPurchaseReturnReportComponent', () => {
  let component: DetailedPurchaseReturnReportComponent;
  let fixture: ComponentFixture<DetailedPurchaseReturnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedPurchaseReturnReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedPurchaseReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
