import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PurchaseOrder } from '@core/domain-classes/purchase-order/purchase-order';
import { PurchaseOrderItem } from '@core/domain-classes/purchase-order/purchase-order-item';
import { PurchaseReturnDetail } from '@core/domain-classes/purchase-order/purchase-return-details';
import { TranslationService } from '@core/services/translation.service';
import { PurchaseService } from 'src/app/purchase/purchase.service';

@Component({
  selector: 'app-purchase-return-item',
  templateUrl: './purchase-return-item.component.html',
  styleUrls: ['./purchase-return-item.component.scss']
})
export class PurchaseReturnItemComponent implements OnInit {
  @Input() purchaseOrder: string;
  purchaseOrderItems: PurchaseReturnDetail[] = [];
  isLoading = false;
  displayedColumns: string[] = ['chemicalName', 'source', 'unitName', 'unitPrice', 'quantity','returnQuantity', 'totalDiscount', 'taxes', 'totalAmount'];

  constructor(private purchaseOrderService: PurchaseService,public translationService: TranslationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['purchaseOrder']) {
      this.getPurchaseOrderItems();
    }
  }

  getPurchaseOrderItems() {
    this.isLoading = true;
    this.purchaseOrderService.getPurchaseReturntems(this.purchaseOrder)
      .subscribe((data: PurchaseReturnDetail[]) => {
        this.isLoading = false;
        this.purchaseOrderItems = data;
      }, () => this.isLoading = false)
  }

}
