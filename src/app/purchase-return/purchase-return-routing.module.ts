import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseReturnListComponent } from './purchase-return-list/purchase-return-list.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseReturnResolverService } from './purchase-return/purchase-return-detail.resolver';
import { AuthGuard } from '@core/security/auth.guard';
import { ManagePurchaseReturnComponent } from './manage-purchase-return/manage-purchase-return.component';



const routes: Routes = [
  {
    path: 'list',
    component: PurchaseReturnListComponent,
    data: { claimType: 'purchase_purchase_return_list_purchase_return' },
    canActivate: [AuthGuard]
  },{
    path: 'detail/:id',
    component: PurchaseReturnComponent,
    resolve:{ purchaseReturn:PurchaseReturnResolverService},
    data: { claimType: 'purchase_purchase_return_view_purchase_return' },
    canActivate: [AuthGuard],
  },
  {
    path: 'manage/:id',
    component: ManagePurchaseReturnComponent,
    resolve:{ purchaseReturn:PurchaseReturnResolverService},
    // data: { claimType: 'purchase_purchase_return_view_purchase_return' },
    // canActivate: [AuthGuard],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseReturnRoutingModule { }
