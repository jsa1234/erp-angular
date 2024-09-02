import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleReturnListComponent } from './sales-return-list/sales-return-list.component';
import { SaleReturnComponent } from './sales-return/sales-return.component';
import { SalesReturnResolverService } from './sales-return/sale-return-detail.resolver';
import { AuthGuard } from '@core/security/auth.guard';



const routes: Routes = [
  {
    path: 'list',
    component: SaleReturnListComponent,
    data: { claimType: 'sale_sale_return_list_sale_return' },
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: SaleReturnComponent,
    data: { claimType: 'sale_sale_return_view_sale_return' },
    canActivate: [AuthGuard],
    resolve: {saleReturn:SalesReturnResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleReturnRoutingModule { }
