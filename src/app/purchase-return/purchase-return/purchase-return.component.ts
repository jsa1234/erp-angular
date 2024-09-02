import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { IPurchaseReturn, PurchaseReturn } from '@core/domain-classes/purchase-order/purchase-return-invoice';
import { PurchaseReturnDetail } from '@core/domain-classes/purchase-order/purchase-return-details';
import { SupplierAccount } from '@core/domain-classes/supplierAccount';
import { Company, ICompany } from '@core/domain-classes/company';



@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.scss'],
})
export class PurchaseReturnComponent extends BaseComponent  implements OnInit {
  purchaseReturn: PurchaseReturn;
  purchaseReturnItems:PurchaseReturnDetail[]=[]
  purchaseReturnForPdf: IPurchaseReturn;
  purchaseReturnPdf: IPurchaseReturn;
  supplier: SupplierAccount;
  companyProfileForPdf: ICompany;
  companyProfilePdf: ICompany;
  companyProfile: Company;
  constructor(
    private routes: ActivatedRoute,
    private clonerService: ClonerService,
    private securityService: SecurityService,
    public translationService: TranslationService) {
    super();
  }

  ngOnInit(): void {
    this.getPurchaseReturn()
    this.subScribeCompanyProfile();
  }

  getPurchaseReturn():void{
    this.sub$.sink=this.routes.data.subscribe((data:{purchaseReturn:IPurchaseReturn})=>{
      if(!data.purchaseReturn)return;
        this.purchaseReturnPdf = data.purchaseReturn
        this.purchaseReturn=new PurchaseReturn(data.purchaseReturn);
        this.purchaseReturnItems=this.purchaseReturn.purchaseReturnDetails
        this.supplier = this.purchaseReturn.supplier
     })
  }
  
  subScribeCompanyProfile() {
    this.securityService.companyProfile.subscribe((data:ICompany) => {
      this.companyProfilePdf = data;
      this.companyProfile = new Company(data);
    });
  }


   generateInvoice() {
    this.purchaseReturnForPdf = this.clonerService.deepClone<IPurchaseReturn>(this.purchaseReturnPdf);
    this.companyProfileForPdf = this.clonerService.deepClone<ICompany>(this.companyProfilePdf);
  }

 
}

