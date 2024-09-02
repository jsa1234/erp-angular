import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStockTransfer } from '@core/domain-classes/stock-transfe.interface';
import { IStockTransferItem } from '@core/domain-classes/stock-transfer-items.interface';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-stock-transfer-detail',
  templateUrl: './stock-transfer-detail.component.html',
  styleUrls: ['./stock-transfer-detail.component.scss']
})
export class StockTransferDetailComponent extends BaseComponent implements OnInit {

  stockTransfer:IStockTransfer
  stockTransferItems:IStockTransferItem[] = []
  constructor(public translate:TranslationService, private route:ActivatedRoute) { super()}

  ngOnInit(): void {
    this.getStockTransferDetail()
  }

  getStockTransferDetail():void{
    this.sub$.sink = this.route.data.subscribe(
      (data: { stockTransfer: IStockTransfer }) => {
        if (!data.stockTransfer) {
          return;
        }
        this.stockTransfer = data.stockTransfer
        this.stockTransferItems = data.stockTransfer.stockTransferDetails
      }
    );
  }
}
