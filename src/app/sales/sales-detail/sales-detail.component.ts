import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISalesInvoice } from '@core/domain-classes/sales-invoice';
import { BaseComponent } from 'src/app/base.component';


@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.scss']
})
export class SalesDetailComponent extends BaseComponent implements OnInit{
  saleInvoice: ISalesInvoice ;
  constructor(
    private routes: ActivatedRoute
   ) {
    super();
  }

  ngOnInit(): void {
    this.getSaleInvoice()
  }

  getSaleInvoice(){
    this.sub$.sink = this.routes.data.subscribe((data:{saleInvoice:ISalesInvoice})=>{
      if(data.saleInvoice){
        this.saleInvoice = data.saleInvoice
      }
    })
  }





 
}
