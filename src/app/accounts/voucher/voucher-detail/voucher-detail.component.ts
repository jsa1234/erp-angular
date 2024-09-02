import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountVoucherDetails } from '@core/domain-classes/account-voucher-details';
import { IVoucher, Voucher } from '@core/domain-classes/voucher';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';


@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent extends BaseComponent implements OnInit {

  Ivoucher:IVoucher
  voucherDetail:AccountVoucherDetails[]=[]
  voucherInvoice : IVoucher
  voucher: Voucher;
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
  loadData(){
    this.sub$.sink = this.route.data.subscribe((data:{voucher:IVoucher})=>{
      if(data.voucher){
        this.Ivoucher = {...data.voucher}
        this.voucher = new Voucher(this.Ivoucher)
        this.voucherDetail = this.Ivoucher.accountVoucherDetails
      }
    })
  }




  generateInvoice() {
    this.voucherInvoice = this.clonerService.deepClone<IVoucher>(this.Ivoucher);
  }


}
