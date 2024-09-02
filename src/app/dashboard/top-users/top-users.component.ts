import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopUsers } from '@core/domain-classes/top-users.interface';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnChanges {
  isLoading$: boolean = false;

  barChartData:any[]=[]
  barChartLabels:string[] =[]
  @Input() topUsersList:TopUsers[]
  constructor(private loader:LoaderService) { }

 ngOnChanges(changes:SimpleChanges){
  if(changes['topUsersList']){
    this.loaderShowOrHide()
    setTimeout(() => {
      this.barChartData = [{ data: this.topUsersList?.map(item => item.value) }];
      this.barChartLabels = this.topUsersList?.map(item => item.nameEnglish);
    }, 1000);
  }


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


  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }

}
