import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bank } from '@core/domain-classes/bank.interface';
import { POSDevice } from '@core/domain-classes/pos-device.interface';
import { POSMerchantAccount } from '@core/domain-classes/pos-merchant-account.interface';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { PosMerchantAccountBanksComponent } from '../../../shared/components/pos-merchant-account-banks/pos-merchant-account-banks.component';
import { MatDialog } from '@angular/material/dialog';
import { PosMerchantAccountDevicesComponent } from '@shared/components/pos-merchant-account-devices/pos-merchant-account-devices.component';

@Component({
  selector: 'app-payment-merchant-detail',
  templateUrl: './payment-merchant-detail.component.html',
  styleUrls: ['./payment-merchant-detail.component.scss']
})
export class PaymentMerchantDetailComponent implements OnInit {
  imagePath$: Observable<string> = of('../../../../assets/images/dummy.jpg');
  posMerchantAccount: POSMerchantAccount;
  posMerchatAccountBanks: Bank[];
  posMerchatAccountDevices:POSDevice[];
  constructor(private route:ActivatedRoute,
    private dialog:MatDialog,) { }

  ngOnInit(): void {
    this.getMerhantAccountData();
  }


  getMerhantAccountData(): void {
    this.route.data.subscribe((data: { posMerchantAccount: POSMerchantAccount }) => {
      if (!data.posMerchantAccount) {
        return;
      }
      this.posMerchantAccount = data.posMerchantAccount
      this.posMerchatAccountBanks = data.posMerchantAccount.posMerchantBanks
      this.posMerchatAccountDevices = data.posMerchantAccount.posMerchantDevices
      if(!this.posMerchantAccount.imagePath)return;
      this.imagePath$ = of(environment.apiUrl+ this.posMerchantAccount.imagePath) 
    });
}


openDetailDialog(componentName:string,uuid:string):void {
  let dialogComponent:any;
  switch (componentName) {
    case 'merchantBank':
      dialogComponent = PosMerchantAccountBanksComponent;
      break;
  
    case 'merchantDevice':
      dialogComponent = PosMerchantAccountDevicesComponent;
      break;
  
    default:
      break;
  }
   this.dialog.open(dialogComponent,{
      width: '100%',
      data:uuid
    });
}
}