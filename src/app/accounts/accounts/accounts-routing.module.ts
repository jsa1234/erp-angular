import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountListComponent } from './account-list/account-list.component';

const routes: Routes = [
  {
    path: '',
    component: AccountListComponent,
    data: { claimType: 'account_account_head_list_account_head' },
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: AccountDetailComponent,
    data: { claimType: 'account_account_head_view_account_head'},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
