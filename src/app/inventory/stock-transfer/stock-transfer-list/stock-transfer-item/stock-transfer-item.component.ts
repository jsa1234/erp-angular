import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IStockTransferItem } from '@core/domain-classes/stock-transfer-items.interface';
import { TranslationService } from '@core/services/translation.service';
import { InventoryService } from 'src/app/inventory/inventory.service';

@Component({
  selector: 'app-stock-transfer-item',
  templateUrl: './stock-transfer-item.component.html',
  styleUrls: ['./stock-transfer-item.component.scss']
})
export class StockTransferItemComponent implements OnInit,OnChanges {

  @Input() stockTransferUUID: string;
  stockTransferItems: IStockTransferItem[] = [];
  isLoading = false;
  displayedColumns: string[] = ['productName', 'productCode','barcode','unit', 'unitPrice', 'quantity',  'totalAmount'];

  constructor(private stockTransferService: InventoryService, public translate:TranslationService) { }
  ngOnInit(): void {
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stockTransferUUID']) {
      this.getStockTransferItems();
    }
  }

  getStockTransferItems() {
    this.isLoading = true;
    this.stockTransferService.getStockTransferDetailsWithStockTransfer(this.stockTransferUUID)
      .subscribe((data: IStockTransferItem[]) => {
        this.isLoading = false;
        this.stockTransferItems = data;
      }, () => this.isLoading = false)
  }
  
}
