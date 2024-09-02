import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopCustomers } from '@core/domain-classes/top-customers.interface';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.scss']
})
export class TopCustomersComponent implements OnChanges {
  barChartData:any[] =[];
  isLoading$: boolean = false;

  barChartLabels:string[]  =[];
  @Input() topCustomersList:TopCustomers[]
  constructor(private loader:LoaderService) { }


 ngOnChanges(changes:SimpleChanges){
  if(changes['topCustomersList']){
    this.loaderShowOrHide()

    setTimeout(() => {
      this.barChartData = [{ data: this.topCustomersList?.map(item => item.value) }];
      this.barChartLabels = this.topCustomersList?.map(item => item.nameEnglish);
    }, 1000);
  }


 }


 loaderShowOrHide(){
  this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
}
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ],
      yAxes: [
        {
          barPercentage: 0.3
        }
      ]
    }
  };

    barChartType:string = 'horizontalBar';
    barChartLegend:boolean = false;

    barChartColors:Array<any> = [
    {
      backgroundColor: '#fad6d7',
      borderColor: '#f58220',
      pointBackgroundColor: '#000',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)',
      borderWidth: 1
    }
  ];






}
