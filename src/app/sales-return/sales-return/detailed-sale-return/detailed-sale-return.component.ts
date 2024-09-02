import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Company, ICompany } from '@core/domain-classes/company';
import { CustomerAccount } from '@core/domain-classes/customer-account';
import { SaleReturnDetail } from '@core/domain-classes/sale-return-detail';
import { ISalesReturn, SalesReturn } from '@core/domain-classes/sales-return';
import { SecurityService } from '@core/security/security.service';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';

@Component({
  selector: 'app-detailed-sale-return',
  templateUrl: './detailed-sale-return.component.html',
  styleUrls: ['./detailed-sale-return.component.scss']
})
export default class DetailedSaleReturnComponent implements OnChanges {
  @Input() saleReturn: ISalesReturn;
  saleReturnPdf: ISalesReturn;
  detailedSaleReturn: SalesReturn;
  client: CustomerAccount;
  saleReturnItems: SaleReturnDetail[];
  detailedSaleReturnForPdf: ISalesReturn;
  company: ICompany;
  companyProfile: Company;

  constructor(    private clonerService: ClonerService,
    public translationService: TranslationService,
    private securityService: SecurityService) { }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['saleReturn']) {
        this.saleReturnPdf = this.saleReturn;
        this.detailedSaleReturn = new SalesReturn(this.saleReturn);
        this.client = this.detailedSaleReturn.customerDetails;
        this.saleReturnItems = this.saleReturn.saleReturnDetails;
        this.saleReturn = null;
      }
    }
    generateInvoice() {
      this.detailedSaleReturnForPdf =
        this.clonerService.deepClone<ISalesReturn>(this.saleReturnPdf);
    }

    subScribeCompanyProfile() {
      this.securityService.companyProfile.subscribe((data:ICompany) => {
        this.company = data;
        this.companyProfile = new Company(this.company)
      });
    }
}
