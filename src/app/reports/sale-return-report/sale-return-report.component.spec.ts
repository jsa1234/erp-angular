import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleReturnReportComponent } from './sale-return-report.component';

describe('SaleReturnReportComponent', () => {
  let component: SaleReturnReportComponent;
  let fixture: ComponentFixture<SaleReturnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleReturnReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
