import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesResolverService } from './sales-detail/sales-detail.resolver';
import { AuthGuard } from '@core/security/auth.guard';
import { ChemicalsResolve } from '@core/services/chemicals.resolve';
import { SalesDetailComponent } from './sales-detail/sales-detail.component';

const routes: Routes = [
  {
    path: 'list',
    component: SalesListComponent,
    data: { claimType: 'sale_sale_invoice_list_sale_invoice' },
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: SalesDetailComponent,
    data: { claimType: 'sale_sale_invoice_view_sale_invoice' },
    canActivate: [AuthGuard],
    resolve: {saleInvoice:SalesResolverService}
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
