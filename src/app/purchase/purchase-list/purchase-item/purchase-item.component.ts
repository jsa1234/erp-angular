import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PurchaseInvoiceDetail } from '@core/domain-classes/purchase-order/purchase-invoice-details';

import { PurchaseService } from '../../purchase.service';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss']
})
export class PurchaseItemComponent implements OnInit, OnChanges {
  @Input() purchaseOrder: string;
  purchaseOrderItems: PurchaseInvoiceDetail[] = [];
  isLoading = false;
  displayedColumns: string[] = ['#','productName', 'code','unitName', 'unitPrice', 'quantity',  'totalDiscount', 'cgst','sgst','igst','cess','adnlCess','mfgDate','expDate','totalAmount'];

  constructor(private purchaseService: PurchaseService, public translate:TranslationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['purchaseOrder']) {
      this.getPurchaseOrderItems();
    }
  }

  getPurchaseOrderItems() {
    this.isLoading = true;
    this.purchaseService.getPurchaseInvoicetems(this.purchaseOrder)
      .subscribe((data: PurchaseInvoiceDetail[]) => {
        this.isLoading = false;
        this.purchaseOrderItems = data;
      }, () => this.isLoading = false)
  }

}
