import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountVoucherDetails } from '@core/domain-classes/account-voucher-details';
import { ICompany, Company } from '@core/domain-classes/company';
import { IVoucher, Voucher } from '@core/domain-classes/voucher';
import { SecurityService } from '@core/security/security.service';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';


@Component({
  selector: 'app-receipt-detail',
  templateUrl: './receipt-detail.component.html',
  styleUrls: ['./receipt-detail.component.scss']
})
export class ReceiptDetailComponent extends BaseComponent implements OnInit {
  Ireceipt:IVoucher
  receiptDetail:AccountVoucherDetails[]=[]
  receiptInvoice : IVoucher
  receipt: Voucher;
  constructor(
   private route:ActivatedRoute,
   public translationService:TranslationService,
   private clonerService: ClonerService,

  ) {
    super();
   
  }

  ngOnInit(): void {
    this.loadData();
    
  }
  loadData():void {
    this.sub$.sink = this.route.data.subscribe((data:{receipt:IVoucher})=>{
      if(data.receipt){
        this.Ireceipt = {...data.receipt}
        this.receipt = new Voucher(this.Ireceipt)
        this.receiptDetail = this.Ireceipt.accountVoucherDetails
      }
    })
  }

 

  generateInvoice():void {
    this.receiptInvoice = this.clonerService.deepClone<IVoucher>(this.Ireceipt);
  }

  

}
