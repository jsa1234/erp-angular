import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TopUsers } from '@core/domain-classes/top-users.interface';
import { LoaderService } from '@shared/services/loader.service';
import { ChartOptions, ChartType, Color } from 'chart.js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnInit, OnChanges,OnDestroy {


  barChartData:any[]=[]
  barChartLabels:string[] =[]
  lineChartData: any[] = [
    {
      label: '',
     // data: [50, 40, 80, 60, 80, 75, 90],
      data:[],
      fill: false,
      borderColor: '#fc8118',
      tension: 0.4, // for smooth curves
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#fc8118',
      pointBorderWidth: 2,
      pointRadius: 3
    },
    {
      label: '',
      //data: [40, 35, 70, 55, 40, 50, 65],
      data:[],
      fill: false,
      borderColor: '#46332E',
      tension: 0.4, // for smooth curves
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#46332E',
      pointBorderWidth: 2,
      pointRadius: 3  }
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
      //  display:false
         grid: {
           display: true, 
         },
         ticks: {
         display: false, 
         },
         min:0,
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          padding:45
        },
      },
      title:{
        display:true,
        text:'Average Sales',
        align:'start',
        font: {
          family: 'DM Sans', 
          size: 14,           
          weight: '700'     
        },
        color: '#262626', 
      }
    },
  };

  // lineChartColors: Color[] = [
  //   {
  //     borderColor: '#fc8118',
  //     backgroundColor: 'rgba(252, 129, 24, 0.2)',
  //     pointBackgroundColor: '#ffffff',
  //     pointBorderColor: '#fc8118',
  //     pointHoverBackgroundColor: '#ffffff',
  //     pointHoverBorderColor: '#fc8118',
  //   },
  //   {
  //     borderColor: '#46332E',
  //     backgroundColor: 'rgba(70, 51, 46, 0.2)',
  //     pointBackgroundColor: '#ffffff',
  //     pointBorderColor: '#46332E',
  //     pointHoverBackgroundColor: '#ffffff',
  //     pointHoverBorderColor: '#46332E',
  //   }
  // ];

  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  @Input() topUsersList:any
  isLoading$: boolean = false;
  private destroy$ = new Subject<void>();
  constructor(private loader:LoaderService) { }


  ngOnInit(): void {
    // Subscribe to loader observable
    this.loader.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this.isLoading$ = isLoading;
      });
  }
 ngOnChanges(changes:SimpleChanges){
  if(changes['topUsersList'] && this.topUsersList){
    this.loaderShowOrHide()
    // setTimeout(() => {
    //   debugger;
    //   this.barChartData = [
    //     { currentYear: this.topUsersList?.currentYearMonthlyAverages || []  },
    //     { prevYear:this.topUsersList?.previousYearMonthlyAverages || []}
      
    //   ];
    //   console.log('barchartdata',this.barChartData)
    //  // this.barChartLabels = this.topUsersList?.map(item => item.nameEnglish);
    // }, 1000);
   this.updateChartData();
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
 updateChartData(): void {
    this.lineChartData[0].label=this.topUsersList?.currentYear;
    this.lineChartData[1].label=this.topUsersList?.previousYear;
    this.lineChartData[0].data = this.topUsersList?.currentYearMonthlyAverages || [];
    this.lineChartData[1].data = this.topUsersList?.previousYearMonthlyAverages || [];
  }
  ngOnDestroy(): void {
    // Complete the destroy subject to clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}



