import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { IPurchaseInvoice, PurchaseInvoice } from '@core/domain-classes/purchase-order/purchase-invoice';
import { PurchaseInvoiceDetail } from '@core/domain-classes/purchase-order/purchase-invoice-details';
import { Company, ICompany } from '@core/domain-classes/company';
import { SupplierAccount } from '@core/domain-classes/supplierAccount';



@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent extends BaseComponent {
  purchaseInvoice: PurchaseInvoice;
  purchaseInvoiceItems: PurchaseInvoiceDetail[];
  purchaseInvoicePdf: IPurchaseInvoice;
  purchaseInvoiceForPdf: IPurchaseInvoice;
  supplier: SupplierAccount;
  constructor(
    private routes: ActivatedRoute,
    private clonerService: ClonerService,
    public translationService: TranslationService,) {
      
    super();
  }

  ngOnInit(): void {
    this.getPurchaseInvoice()
  }

  getPurchaseInvoice():void{
    this.sub$.sink = this.routes.data.subscribe((data:{purchaseInvoice:IPurchaseInvoice})=>{
      if(!data.purchaseInvoice)return;
      this.purchaseInvoicePdf = data.purchaseInvoice
      this.purchaseInvoice = new PurchaseInvoice(data.purchaseInvoice)
      this.purchaseInvoiceItems = this.purchaseInvoice.purchaseInvoiceDetails
      this.supplier = this.purchaseInvoice.supplier
    })
  }




 
  generateInvoice() {
    this.purchaseInvoiceForPdf = this.clonerService.deepClone<IPurchaseInvoice>(this.purchaseInvoicePdf);
  }
  


}

