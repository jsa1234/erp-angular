import { Component, Input, OnChanges,SimpleChanges } from '@angular/core';
import { BudgetAnalyzer } from '@core/domain-classes/budget-analyzer.interface';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-financial-insights-chart',
  templateUrl: './financial-insights-chart.component.html',
  styleUrls: ['./financial-insights-chart.component.scss']
})
export class FinancialInsightsChartComponent implements OnChanges {
@Input() financialInsightDataList:BudgetAnalyzer[]
  chartLabels: string[];
  isLoading$: boolean = false;

  chartData: number[];
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend:{
      position:'top'
    }
  };
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];

   pieChartColors: Array < any > = [{
    backgroundColor: ['#b9ffd3', '#fad6d7', '#ffe0c1', '#8fbeff'],
    borderColor: ['#329155', '#f58220', '#d87919', '#006cff']
 }];
  constructor(private translate:TranslationService,private loader:LoaderService) { }

  ngOnChanges(changes:SimpleChanges): void {
    if(changes['financialInsightDataList']){
    this.loaderShowOrHide()

      this.chartData = this.financialInsightDataList?.map(item => item.value);
      this.chartLabels = this.financialInsightDataList?.map(item => this.translate.getValue(item.titleKey));
    }
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }

}
