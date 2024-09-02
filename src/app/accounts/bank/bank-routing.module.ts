import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankListComponent } from './bank-list/bank-list.component';
import { ManageBankComponent } from './manage-bank/manage-bank.component';
import { AuthGuard } from '@core/security/auth.guard';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { BankResolver } from './bank.resolver';

const routes: Routes = [
  {
    path:'',
    component:BankListComponent,
    // data: { claimType: 'account_bank_list_bank' },
    // canActivate: [AuthGuard]
  },
  {
    path:'detail/:id',
    component:BankDetailComponent,
    resolve:{resolvedBankData:BankResolver},
    // data: { claimType: 'account_bank_view_bank' },
    // canActivate: [AuthGuard]
  },
  {
    path:'manage/:id',
    component:ManageBankComponent,
    resolve:{resolvedBankData:BankResolver},
    // data: { claimType: ['account_bank_create_bank','account_bank_edit_bank'] },
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
