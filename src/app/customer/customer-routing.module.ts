import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerResolverService } from './customer-detail/customer-detail.resolver';
import { AuthGuard } from '@core/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    data: { claimType: 'account_customer_list_customer' },
    canActivate: [AuthGuard]
  },
  {
    path: 'manage/:id',
    component: CustomerDetailComponent,
    resolve: {
      customer: CustomerResolverService
    },
    data: { claimType: ['account_customer_create_customer', 'account_customer_edit_customer'] },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
