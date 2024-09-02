import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiptDetailComponent } from './receipt-detail/receipt-detail.component';
import { ReceiptDetailResolverService } from './receipt-detail/receipt-detail.resolver';
import { ReceiptListComponent } from './receipt-list/receipt-list.component';
import { AuthGuard } from '@core/security/auth.guard';
import { ManageReceiptResolver } from './manage-receipt/manage-receipt.resolver';
import { ManageReceiptComponent } from './manage-receipt/manage-receipt.component';

const routes: Routes = [
  {
    path: '',
    component: ReceiptListComponent,
    data: { claimType: 'account_receipt_voucher_list_receipt_voucher' },
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: ReceiptDetailComponent,
    resolve: {receipt: ReceiptDetailResolverService
    },
    data: { claimType: 'account_receipt_voucher_view_receipt_voucher' },
    canActivate: [AuthGuard]
  },
  {
    path: 'manage/:id',
    component: ManageReceiptComponent,
    resolve: {receipt: ManageReceiptResolver },
    data: { claimType: ['account_receipt_voucher_create_receipt_voucher','account_receipt_voucher_edit_receipt_voucher'] },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptRoutingModule { }
