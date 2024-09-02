import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SalesInvoiceDetails } from '@core/domain-classes/sales-invoiceDetail';
import { SalesService } from '../../sales.service';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-sales-items',
  templateUrl: './sales-items.component.html',
  styleUrls: ['./sales-items.component.scss']
})
export class SalesOrderItemsComponent implements OnInit, OnChanges {
  @Input() salesOrder: string;
  salesOrderItems: SalesInvoiceDetails[] = [];
  isLoading = false;
  displayedColumns: string[] = ['chemicalName', 'source','unitName', 'unitPrice', 'quantity',  'totalDiscount', 'totalTax','totalAmount'];

  constructor(private salesOrderService: SalesService, public translate:TranslationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['salesOrder']) {
      this.getSalesInvoiceDetails();
    }
  }

  getSalesInvoiceDetails() {
    this.isLoading = true;
    this.salesOrderService.getSalesInvoiceDetail(this.salesOrder)
      .subscribe((data: SalesInvoiceDetails[]) => {
        this.isLoading = false;
        this.salesOrderItems = data;
      }, () => this.isLoading = false)
  }

}
