import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierResolverService } from './supplier-detail/supplier-detail.resolver';
import { SupplierListComponent } from './supplier-list/supplier-list.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierListComponent,
    data: { claimType: 'account_supplier_list_supplier' },
    canActivate: [AuthGuard]
  }, {
    path: 'manage/:id',
    component: SupplierDetailComponent,
    resolve: { supplier: SupplierResolverService },
    data: { claimType: ['account_supplier_create_supplier', 'account_supplier_edit_supplier'] },
    canActivate: [AuthGuard]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
