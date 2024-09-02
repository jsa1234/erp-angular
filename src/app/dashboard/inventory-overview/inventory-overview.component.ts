import { Component, OnChanges,Input,SimpleChanges } from '@angular/core';
import { FinancialSummary } from '@core/domain-classes/financial_summary.interface';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-inventory-overview',
  templateUrl: './inventory-overview.component.html',
  styleUrls: ['./inventory-overview.component.scss']
})
export class InventoryOverviewComponent implements OnChanges {
  @Input() financialSummaryCounts:FinancialSummary
  totalSale: number;
  saleDiscount: number;
  totalPurchase: number;
  receivable: number;
  stockValue: number;
  cashInHand: number;
  isLoading$: boolean = false;

  constructor(private loader:LoaderService) { }

  ngOnChanges(changes:SimpleChanges): void {
    if(changes['financialSummaryCounts']){
      this.loaderShowOrHide()
      this.totalSale = this.financialSummaryCounts?.totalSale
      this.totalPurchase = this.financialSummaryCounts?.totalPurchase
      this.saleDiscount = this.financialSummaryCounts?.saleDiscount
      this.receivable = this.financialSummaryCounts?.receivable
      this.stockValue = this.financialSummaryCounts?.stockValue
      this.cashInHand = this.financialSummaryCounts?.cashInHand
    }
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }

}
