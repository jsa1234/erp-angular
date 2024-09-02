import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInsightsChartComponent } from './financial-insights-chart.component';

describe('FinancialInsightsChartComponent', () => {
  let component: FinancialInsightsChartComponent;
  let fixture: ComponentFixture<FinancialInsightsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialInsightsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialInsightsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
