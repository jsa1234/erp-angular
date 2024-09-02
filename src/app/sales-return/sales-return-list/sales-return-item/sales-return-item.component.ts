import { Component, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { SaleReturnDetail } from '@core/domain-classes/sale-return-detail';
import { SalesOrder } from '@core/domain-classes/sales-order';
import { SalesOrderItem } from '@core/domain-classes/sales-order-item';
import { TranslationService } from '@core/services/translation.service';
import { SalesService } from 'src/app/sales/sales.service';

@Component({
  selector: 'app-sales-return-item',
  templateUrl: './sales-return-item.component.html',
  styleUrls: ['./sales-return-item.component.scss']
})
export class SaleReturnItemComponent implements OnChanges {
  @Input() saleReturnUUID: string;
  salesReturnItems:SaleReturnDetail[]
  isLoading = false;
  displayedColumns: string[] = ['productName', 'productCode', 'unitName', 'unitPrice', 'quantity', 'returnQuantity','discount', 'taxAmount', 'total'];

  constructor(private salesReturnService: SalesService, private translate:TranslationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['saleReturnUUID']) {
      this.getSalesReturnItems();
    }
  }

  getSalesReturnItems() {
    this.isLoading = true;
    this.salesReturnService.getSalesReturnDetail(this.saleReturnUUID)
      .subscribe((data: SaleReturnDetail[]) => {
        this.isLoading = false;
        this.salesReturnItems = data;
      }, () => this.isLoading = false)
  }
}

