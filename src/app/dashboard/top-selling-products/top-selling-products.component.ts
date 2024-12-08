import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopSellingProducts } from '@core/domain-classes/top-selling-product.interface';
import { LoaderService } from '@shared/services/loader.service';
import { Chart, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.scss']
})
export class TopSellingProductsComponent implements OnChanges {
  barChartData:any[]=[];
  isLoading$: boolean = false;

  barChartLabels:string[] =[];

  lineChartData: any[] = [
    {
      label: 'Sales Return',
      data: [],
      fill: true,
      borderColor: '#fc8118',
      backgroundColor:'#FD9A466B',
      tension: 0.4, // for smooth curves
      //FD9A466B
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#fc8118',
      pointBorderWidth: 2,
      pointRadius: 3,
      pointHoverRadius:5
    },
    {
      label: 'Purchase Return',
      data: [],
      fill: true,
      borderColor: '#46332E',
      backgroundColor:'#46332E73',
      tension: 0.4, // for smooth curves
       pointBackgroundColor: '#ffffff',
       pointBorderColor: '#46332E',
       pointBorderWidth: 2,
      // pointRadius: 5
      pointRadius: 3,
      pointHoverRadius:5
    }
  ];

  lineChartLabels: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL','AUG','SEP','OCT','NOV','DEC'];
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true, 
        },
        ticks: {
          display: true, 
        },
        min:0
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          padding:45,
          generateLabels: (chart) => {
            const original = Chart.defaults.plugins.legend.labels.generateLabels;
            const labels = original(chart);
            
            labels.forEach((label) => {
              if (label.text === 'Purchase Return') {
                label.fillStyle  = '#46332E';
              }
            });
            return labels;  
          }
        },
      },
      title:{
        display:true,
        text:'Returns',
        align:'start',
        font: {
          family: 'DM Sans', 
          size: 14,           
          weight: '700'     
        },
        color: '#262626', 
      },
      tooltip:{
        enabled:true
      }
    },
  };
  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  @Input() topSellingProductsList:any
  constructor(private loader:LoaderService) { }


 ngOnChanges(changes:SimpleChanges){
  if(changes['topSellingProductsList']){
    this.loaderShowOrHide()

    //setTimeout(() => {
     // this.barChartData = [{ data: this.topSellingProductsList?.map(item => item.value) }];
      this.lineChartData[0].data = this.topSellingProductsList?.monthlySalesReturnCurrentYear || [];
      this.lineChartData[1].data = this.topSellingProductsList?.monthlyPurchaseReturnCurrentYear || [];
     // this.barChartLabels = this.topSellingProductsList?.map(item => item.nameEnglish);
   // }, 1000);
  }
 //monthlyPurchaseReturnCurrentYear
// monthlySalesReturnCurrentYear

 }

  // public barChartOptions:any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true,
  //   scales: {
  //     xAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }
  //     ],
  //     yAxes: [
  //       {
  //         barPercentage: 0.3
  //       }
  //     ]
  //   }
  // };

  //   barChartType:string = 'horizontalBar';
  //   barChartLegend:boolean = false;

  //   barChartColors:Array<any> = [
  //   {
  //     backgroundColor: '#fad6d7',
  //     borderColor: '#f58220',
  //     pointBackgroundColor: '#000',
  //     pointBorderColor: '#fafafa',
  //     pointHoverBackgroundColor: '#fafafa',
  //     pointHoverBorderColor: 'rgba(105,159,177)',
  //     borderWidth: 1
  //   }
  // ];
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }

}
