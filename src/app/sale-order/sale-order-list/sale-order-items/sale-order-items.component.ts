import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SaleOrderService } from '../../sale-order.service';
import { SaleOrderDetail } from '@core/domain-classes/sale-order-detail.interface';

@Component({
  selector: 'app-sale-order-items',
  templateUrl: './sale-order-items.component.html',
  styleUrls: ['./sale-order-items.component.scss']
})
export class SaleOrderItemsComponent implements OnInit,OnChanges {
@Input() saleOrderUUID:string;
isLoading:boolean = false;
displayedColumns: string[] = ['productCode', 'productName','unitName', 'unitPrice', 'quantity',  'totalDiscount', 'cgstAmount','sgstAmount','igstAmount','cessAmount','addnlCessAmount','totalAmount'];
  saleOrderItems: SaleOrderDetail[];
  constructor(private saleOrderService:SaleOrderService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['saleOrderUUID']){
      this.getSaleOrderItems()
    }
  }
  getSaleOrderItems() {
    this.isLoading = true;
    this.saleOrderService.getSaleOrderItems(this.saleOrderUUID)
      .subscribe((data: SaleOrderDetail[]) => {
        this.saleOrderItems = data;
        this.isLoading = false;
      }, () => this.isLoading = false)
  }

  ngOnInit(): void {
  }

}
