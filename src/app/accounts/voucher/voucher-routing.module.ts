import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { VoucherDetailResolverService } from './voucher-detail/voucher-detail.resolver';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { AuthGuard } from '@core/security/auth.guard';
import { ManageVoucherComponent } from './manage-voucher/manage-voucher.component';
import { ManageVoucherResolver } from './manage-voucher/manage-voucher.resolver';

const routes: Routes = [
  {
    path: '',
    component: VoucherListComponent,
    data: { claimType: 'account_payment_voucher_list_payment_voucher' },
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: VoucherDetailComponent,
    resolve: {voucher: VoucherDetailResolverService},
    data: { claimType: 'account_payment_voucher_view_payment_voucher'},
    canActivate: [AuthGuard]
  },
  {
    path: 'manage/:id',
    component: ManageVoucherComponent,
    resolve: {voucher: ManageVoucherResolver},
    data: { claimType: ['account_payment_voucher_create_payment_voucher','account_payment_voucher_edit_payment_voucher']},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherRoutingModule { }
