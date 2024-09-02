import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseDetailResolver } from './purchase-detail/purchase-details.resolver';
import { PurchaseBarcodeComponent } from './purchase-barcode/purchase-barcode.component';
import { BarcodeResolver } from './purchase-barcode/barcode.resolver';
import { PurchaseManageComponent } from './purchase-manage/purchase-manage.component';

const routes: Routes = [
  {
    path: 'list',
    component: PurchaseListComponent,
    data: { claimType: 'purchase_purchase_invoice_list_purchase_invoice' },
    canActivate: [AuthGuard]
  }, 
  {
    path: 'detail/:id',
    component: PurchaseDetailComponent,
    data: { claimType: 'purchase_purchase_invoice_view_purchase_invoice'},
    canActivate: [AuthGuard],
    resolve:{purchaseInvoice:PurchaseDetailResolver}
  },
  {
    path: 'barcode-generate/:id',
    component: PurchaseBarcodeComponent,
    // data: { claimType: ['product_product_create_product', 'product_product_edit_product'] },
    // canActivate: [AuthGuard],
    resolve: { barcode: BarcodeResolver }
  },
  {
    path: 'manage/:id',
    component: PurchaseManageComponent,
    // data: { claimType: ['product_product_create_product', 'product_product_edit_product'] },
    // canActivate: [AuthGuard],
    resolve:{purchaseInvoice:PurchaseDetailResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
