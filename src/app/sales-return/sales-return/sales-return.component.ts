import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISalesReturn } from '@core/domain-classes/sales-return';
import { BaseComponent } from 'src/app/base.component';



@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.scss'],
})
export class SaleReturnComponent  extends BaseComponent implements OnInit {
  saleReturn: ISalesReturn;
  constructor(
    private routes: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.getSaleReturn()
  }

  getSaleReturn(){
    this.sub$.sink = this.routes.data.subscribe((data:{saleReturn:ISalesReturn})=>{
      if(data.saleReturn){
        this.saleReturn = data.saleReturn
      }
    })
  }



}
