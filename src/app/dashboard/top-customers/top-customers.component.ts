import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopCustomers } from '@core/domain-classes/top-customers.interface';
import { LoaderService } from '@shared/services/loader.service';
import { ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.scss']
})
export class TopCustomersComponent implements OnChanges {
 // barChartData:any[] =[];
  isLoading$: boolean = false;
  //barChartLabels:string[]  =[];
  chartData: any;
  redeemedTotal: number = 0;
  balanceTotal: number = 0;
  chartType: ChartType = 'doughnut';
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Hide default legend
      tooltip: { enabled: false }, // Hide tooltip
      title:{
        display:true,
        text:'Top Vouchers',
        align:'start'
      }
    }
  } as ChartOptions;
  semiDoughnutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    cutout: '80%', // Making the doughnut "semi"
    rotation: -90, // Start from the top
    circumference: 180, // Show only half circle
    plugins: {
      legend: { display: false }, // Hide the legend
      tooltip: { enabled: false }, // Disable tooltips
      title:{
        display:true,
        text:'Total Vouchers',
        align:'start',
        font: {
          family: 'DM Sans', 
          size: 14,           
          weight: 700     
        },
        color: '#262626', 
      }
    },
  };
  @Input() topCustomersList:TopCustomers[]
  constructor(private loader:LoaderService) { }
 ngOnChanges(changes:SimpleChanges){
  // if(changes['topCustomersList']){
  //   this.loaderShowOrHide()
  //   setTimeout(() => {
  //     this.barChartData = [{ data: this.topCustomersList?.map(item => item.value) }];
  //     this.barChartLabels = this.topCustomersList?.map(item => item.nameEnglish);
  //   }, 1000);
  // }
  this.redeemedTotal = 0; // Dummy data for redeemed percentage
    this.balanceTotal = 0; // Dummy data for balance percentage
    this.chartData = {
      labels: ['Redeemed', 'Balance'],
      datasets: [{
        data: [this.redeemedTotal, this.balanceTotal],
        backgroundColor: ['#FC8118', '#C5C5C5'],
        hoverBackgroundColor: ['#FC8118', '#C5C5C5'],
        borderWidth: 0
      }]
    };
  }
//  loaderShowOrHide(){
//   this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
// }
//   public barChartOptions:any = {
//     scaleShowVerticalLines: false,
//     responsive: true,
//     scales: {
//       xAxes: [
//         {
//           ticks: {
//             beginAtZero: true
//           }
//         }
//       ],
//       yAxes: [
//         {
//           barPercentage: 0.3
//         }
//       ]
//     }
//   };
//     barChartType:string = 'horizontalBar';
//     barChartLegend:boolean = false;
//     barChartColors:Array<any> = [
//     {
//       backgroundColor: '#FAD6D7',
//       borderColor: '#F58220',
//       pointBackgroundColor: '#000',
//       pointBorderColor: '#FAFAFA',
//       pointHoverBackgroundColor: '#FAFAFA',
//       pointHoverBorderColor: 'rgba(105,159,177)',
//       borderWidth: 1
//     }
//   ];
}