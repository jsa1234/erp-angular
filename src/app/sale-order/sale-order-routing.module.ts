import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleOrderListComponent } from './sale-order-list/sale-order-list.component';
import { AuthGuard } from '@core/security/auth.guard';
import { SaleOrderDetailComponent } from './sale-order-detail/sale-order-detail.component';
import { ManageSaleOrderComponent } from './manage-sale-order/manage-sale-order.component';
import { SaleOrderResolver } from './sale-order.resolver';

const routes: Routes = [
  {
    path: 'list',
    component: SaleOrderListComponent,
    data: { claimType: 'sale_sale_order_list_sale_order' },
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: SaleOrderDetailComponent,
    data: { claimType: 'sale_sale_order_view_sale_order' },
    canActivate: [AuthGuard],
    resolve: {saleOrder:SaleOrderResolver}
  } ,
  // {
  //   path: 'manage/:id',
  //   component: ManageSaleOrderComponent,
  //   // data: { claimType: 'sale_sale_invoice_view_sale_invoice' },
  //   // canActivate: [AuthGuard],
  //   // resolve: {saleInvoice:SalesResolverService}
  // } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleOrderRoutingModule { }
