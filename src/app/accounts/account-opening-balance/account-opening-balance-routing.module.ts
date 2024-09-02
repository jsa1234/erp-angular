import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOpeningBalanceListComponent } from './account-opening-balance-list/account-opening-balance-list.component';
import { ManageAccountOpeningBalanceComponent } from './manage-account-opening-balance/manage-account-opening-balance.component';

const routes: Routes = [
  {
    path:'',
    component:AccountOpeningBalanceListComponent
  },
  {
    path:'',
    component:ManageAccountOpeningBalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountOpeningBalanceRoutingModule { }
