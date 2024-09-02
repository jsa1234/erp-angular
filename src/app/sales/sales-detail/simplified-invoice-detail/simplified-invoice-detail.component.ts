import { Component, Input, OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { ISalesInvoice, SalesInvoice } from '@core/domain-classes/sales-invoice';
import { SalesInvoiceDetails } from '@core/domain-classes/sales-invoiceDetail';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { SecurityService } from '@core/security/security.service';
import { ClonerService } from '@core/services/clone.service';
import { Company, ICompany } from '@core/domain-classes/company';
import { CustomerAccount } from '@core/domain-classes/customer-account';


@Component({
  selector: 'app-simplified-invoice-detail',
  templateUrl: './simplified-invoice-detail.component.html',
  styleUrls: ['./simplified-invoice-detail.component.scss']
})
export class SimplifiedInvoiceDetailComponent extends BaseComponent implements OnChanges {
@Input() saleInvoice:ISalesInvoice
simplifiedSaleInvoice:SalesInvoice
simplifiedSaleInvoiceForPdf:ISalesInvoice
saleInvoiceItems:SalesInvoiceDetails[]=[]
company: ICompany;
companyProfile: Company;
  saleInvoicePdf: ISalesInvoice;
  companyProfileForPdf: ICompany;
  client: CustomerAccount;
  constructor(public translationService:TranslationService,
    private clonerService:ClonerService,
    private securityService: SecurityService,
    ) {super() }

 ngOnChanges(changes:SimpleChanges):void{
  this.subScribeCompanyProfile()
  if (changes['saleInvoice']) {
    this.saleInvoicePdf = this.saleInvoice
    this.simplifiedSaleInvoice = new SalesInvoice(this.saleInvoice)
    this.client = this.simplifiedSaleInvoice.clientObject
    this.saleInvoiceItems = this.saleInvoice.saleInvoiceDetails
    this.saleInvoice =null
  }

 }

 generateInvoice() {
   this.simplifiedSaleInvoiceForPdf =this.clonerService.deepClone<ISalesInvoice>(this.saleInvoicePdf) 
   this.companyProfileForPdf =this.clonerService.deepClone<ICompany>(this.company)
}
subScribeCompanyProfile() {
  this.securityService.companyProfile.subscribe((data:ICompany) => {
    this.company = data;
    this.companyProfile = new Company(this.company)
  });
}
}
