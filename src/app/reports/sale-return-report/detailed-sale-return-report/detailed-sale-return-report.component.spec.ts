import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSaleReturnReportComponent } from './detailed-sale-return-report.component';

describe('DetailedSaleReturnReportComponent', () => {
  let component: DetailedSaleReturnReportComponent;
  let fixture: ComponentFixture<DetailedSaleReturnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedSaleReturnReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSaleReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
