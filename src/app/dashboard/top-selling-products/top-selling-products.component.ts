import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopSellingProducts } from '@core/domain-classes/top-selling-product.interface';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.scss']
})
export class TopSellingProductsComponent implements OnChanges {
  barChartData:any[]=[];
  isLoading$: boolean = false;

  barChartLabels:string[] =[];
  @Input() topSellingProductsList:TopSellingProducts[]
  constructor(private loader:LoaderService) { }


 ngOnChanges(changes:SimpleChanges){
  if(changes['topSellingProductsList']){
    this.loaderShowOrHide()

    setTimeout(() => {
      this.barChartData = [{ data: this.topSellingProductsList?.map(item => item.value) }];
      this.barChartLabels = this.topSellingProductsList?.map(item => item.nameEnglish);
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
