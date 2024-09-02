import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerAccount } from '@core/domain-classes/customer-account';
import { SaleOrderDetail } from '@core/domain-classes/sale-order-detail.interface';
import { ISaleOrder } from '@core/domain-classes/sale-order.interface';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-sale-order-detail',
  templateUrl: './sale-order-detail.component.html',
  styleUrls: ['./sale-order-detail.component.scss']
})
export class SaleOrderDetailComponent extends BaseComponent implements OnInit {
  saleOrder: ISaleOrder;
  customer: CustomerAccount;
  saleOrderItems: SaleOrderDetail[];

  constructor(private routes:ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.getSaleOrder()
  }
  getSaleOrder(){
    this.sub$.sink = this.routes.data.subscribe((data:{saleOrder:ISaleOrder})=>{
      if(data.saleOrder){
        this.saleOrder = data.saleOrder
        this.customer = new CustomerAccount(this.saleOrder.clientObject)
        this.saleOrderItems = this.saleOrder.saleOrderDetails
      }
    })
  }
}
