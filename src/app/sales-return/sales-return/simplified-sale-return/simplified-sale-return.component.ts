import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICustomerAccount } from '@core/domain-classes/customer-account';
import { SaleReturnDetail } from '@core/domain-classes/sale-return-detail';
import { ISalesReturn, SalesReturn } from '@core/domain-classes/sales-return';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-simplified-sale-return',
  templateUrl: './simplified-sale-return.component.html',
  styleUrls: ['./simplified-sale-return.component.scss'],
})
export class SimplifiedSaleReturnComponent implements OnChanges {
  @Input() saleReturn: ISalesReturn;
  saleReturnPdf: ISalesReturn;
  simplifiedSaleReturn: SalesReturn;
  client: ICustomerAccount;
  saleReturnItems: SaleReturnDetail[];
  simplifiedSaleReturnForPdf: ISalesReturn;

  constructor(
    private clonerService: ClonerService,
    public translationService: TranslationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['saleReturn']) {
      this.saleReturnPdf = this.saleReturn;
      this.simplifiedSaleReturn = new SalesReturn(this.saleReturn);
      this.client = this.simplifiedSaleReturn.customerDetails;
      this.saleReturnItems = this.saleReturn.saleReturnDetails;
      this.saleReturn = null;
    }
  }
  generateInvoice() {
    this.simplifiedSaleReturnForPdf =
      this.clonerService.deepClone<ISalesReturn>(this.saleReturnPdf);
  }
}
