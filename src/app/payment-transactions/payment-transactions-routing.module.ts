import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentTransactionsListComponent } from './payment-transactions-list/payment-transactions-list.component';

const routes: Routes = [
  {
    path:'',
    component:PaymentTransactionsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentTransactionsRoutingModule { }