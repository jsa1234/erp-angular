import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoaderService } from '@shared/services/loader.service';
import { Chart, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss']
})
export class RevenueChartComponent implements OnChanges {

  isLoading$: boolean = false;
  barChartData: any[] = [
    {
      data:[],
      borderRadius:25,
      barThickness:8,
      backgroundColor:'#908582'
     // hoverBackgroundColor: 'transparent'
    },
  ];
  barChartLabels: [];
  //barChartLabels: string[] = ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins:{
      tooltip: { enabled: true },
      title:{
        display:true,
        text:'Revenue',
        align:'start',
        font: {
          family: 'DM Sans', 
          size: 14,           
          weight: '700'     
        },
        color: '#262626', 
        padding:{
          top:10,
          bottom:50
        }
      },
      legend:{
        display:false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#9A9388'
        },
      },
      y: {
        grid: {
          color: '#E5E5E5'
        },
        ticks: {
          color: '#9A9388',
          stepSize: 2 // Adjust as per your data range
        },
        beginAtZero: true
      },
      
    },
    hover: {
      mode: null // This disables hover interactions
    }
  }
  barChartType: ChartType = 'bar';
  @Input() revenueList:any
  constructor(private loader:LoaderService) { }

  ngOnChanges(changes:SimpleChanges){
    if(changes['revenueList']){
      this.loaderShowOrHide()
     this.barChartData[0].data = this.revenueList?.graphDataList.map(item => item.revenue) || [];
      this.barChartLabels = this.revenueList?.graphDataList.map(item => item.date) || [];
    }
  
  
   }
   loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }

}
