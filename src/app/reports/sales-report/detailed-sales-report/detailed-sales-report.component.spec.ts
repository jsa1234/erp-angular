import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSalesReportComponent } from './detailed-sales-report.component';

describe('DetailedSalesReportComponent', () => {
  let component: DetailedSalesReportComponent;
  let fixture: ComponentFixture<DetailedSalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedSalesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
