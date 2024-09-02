import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentMerchantDetailComponent } from './payment-merchant-detail/payment-merchant-detail.component';
import { PaymentMerchantListComponent } from './payment-merchant-list/payment-merchant-list.component';
import { ManagePaymentMerchantComponent } from './manage-payment-merchant/manage-payment-merchant.component';
import { PosMerchantAccountResolver } from './pos-merchant-account.resolver';

const routes: Routes = [
  {
    path:'',
    component:PaymentMerchantListComponent
  },
  {
    path:'manage/:id',
    component:ManagePaymentMerchantComponent,
    resolve:{posMerchantAccount:PosMerchantAccountResolver}
  },
  {
    path:'detail/:id',
    component:PaymentMerchantDetailComponent,
    resolve:{posMerchantAccount:PosMerchantAccountResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentMerchantRoutingModule { }
