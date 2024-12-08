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
@Input() financialInsightDataList:any
  chartLabels: string[];
  isLoading$: boolean = false;

  chartData: any
  salesTotal: any = 0;
  purchaseTotal: any = 0;
  pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display:false,
       // position: 'bottom'
      },
      title:{
        display:false,
        text:'Sales & Purchase',
        align:'start'
      },
    }
  };
  pieChartType: ChartType = 'doughnut';
  //pieChartLegend = true;
  //pieChartPlugins = [];

   pieChartColors: Array < any > = [{
    backgroundColor: ['#FC8118', '#46332E'],
    borderColor: ['#FC8118','#46332E']
 }];
  constructor(private translate:TranslationService,private loader:LoaderService) { }

  ngOnChanges(changes:SimpleChanges): void {
    if(changes['financialInsightDataList']){
    this.loaderShowOrHide()
    this.updateChartData();
      // debugger;
      // this.chartData = this.financialInsightDataList?.map(item => item.value);
      // this.chartLabels = this.financialInsightDataList?.map(item => this.translate.getValue(item.titleKey));
      // console.log('chartData',  this.chartData)
      // console.log('chartLabels',this.chartLabels);
    }
  }
  updateChartData(): void {
    
     // const chartValues = filteredData.map(item => item.value || 0);
      //const chartValues = this.financialInsightDataList.map(item => item.value || 0);
      const chartValues = [
        this.financialInsightDataList?.totalSales || 0, // Assign `totalSales` or default to 0 if undefined
        this.financialInsightDataList?.totalPurchase || 0 // Assign `totalPurchase` or default to 0 if undefined
      ];
      this.salesTotal=chartValues[0];
      this.purchaseTotal=chartValues[1];
     
      this.chartData = {
       // labels: chartLabels,
        datasets: [{
          data: chartValues,
          //backgroundColor: this.pieChartColors[0].backgroundColor,
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              // This can happen if the chart is not fully rendered yet.
              return null;
            }

            // Create gradient for 'Sales' slice
            const salesGradient = ctx.createRadialGradient(
              chartArea.width / 2, chartArea.height / 2, chartArea.width / 6,
              chartArea.width / 2, chartArea.height / 2, chartArea.width / 2
            );
            salesGradient.addColorStop(0, '#FECDA3');
            salesGradient.addColorStop(1, '#FC8118');

            // Create gradient for 'Purchase' slice
            const purchaseGradient = ctx.createRadialGradient(
              chartArea.width / 2, chartArea.height / 2, chartArea.width / 6,
              chartArea.width / 2, chartArea.height / 2, chartArea.width / 2
            );
            purchaseGradient.addColorStop(0, '#B5ADAB');
            purchaseGradient.addColorStop(1, '#46332E');

            // Return gradient for respective slice
            if (context.dataIndex === 0) {
              return salesGradient; // Sales slice
            } else if (context.dataIndex === 1) {
              return purchaseGradient; // Purchase slice
            }

            return null;
          },
          hoverBackgroundColor:['#FC8118','#46332E'],
          borderColor: this.pieChartColors[0].borderColor,
          borderWidth: 1
        }]
      };
    //}
    // else
    // {
    //   this.chartData = null;
    // }
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }

}
