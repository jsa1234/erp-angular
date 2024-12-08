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
  selector: 'app-detailed-invoice-detail',
  templateUrl: './detailed-invoice-detail.component.html',
  styleUrls: ['./detailed-invoice-detail.component.scss']
})
export class DetailedInvoiceDetailComponent extends BaseComponent implements OnInit,OnChanges  {

  @Input() saleInvoice:ISalesInvoice
detailedSaleInvoice:SalesInvoice
saleInvoiceItems:SalesInvoiceDetails[]=[]
company: ICompany;
companyProfile: Company;
detailedSaleInvoiceForPdf:ISalesInvoice
  saleInvoicePdf: ISalesInvoice;
  companyProfileForPdf: ICompany;
  client: CustomerAccount;

  constructor(public translationService:TranslationService,
    private clonerService:ClonerService,
    private securityService: SecurityService) {super() }

  ngOnInit(): void {
  }
 ngOnChanges(changes:SimpleChanges):void{
  this.subScribeCompanyProfile()
  if (changes['saleInvoice']) {
    this.saleInvoicePdf = this.saleInvoice
    this.detailedSaleInvoice = new SalesInvoice(this.saleInvoice)
    this.client = this.detailedSaleInvoice.clientObject
    this.saleInvoiceItems = this.saleInvoice.saleInvoiceDetails
    this.saleInvoice =null
  }
 }
 generateInvoice() {
  debugger
  console.log(this.saleInvoicePdf);
   this.detailedSaleInvoiceForPdf =this.clonerService.deepClone<ISalesInvoice>(this.saleInvoicePdf)
   this.companyProfileForPdf =this.clonerService.deepClone<ICompany>(this.company)
}
 subScribeCompanyProfile() {
  this.securityService.companyProfile.subscribe((data:ICompany) => {
    this.company = data;
    this.companyProfile = new Company(this.company)
  });
}
}
