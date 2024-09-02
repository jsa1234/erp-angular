import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningStockComponent } from './opening-stock/opening-stock.component';
import { AuthGuard } from '@core/security/auth.guard';
import { DamageEntryListComponent } from './damage-entry/damage-entry-list/damage-entry-list.component';
import { ManageDamageEntryComponent } from './damage-entry/manage-damage-entry/manage-damage-entry.component';
import { DamageEntryDetailsComponent } from './damage-entry/damage-entry-details/damage-entry-details.component';
import { DamageEntryResolver } from './damage-entry/manage-damage-entry/damage-entry.resolver';
import { StockTransferListComponent } from './stock-transfer/stock-transfer-list/stock-transfer-list.component';
import { ManageStockTransferComponent } from './stock-transfer/manage-stock-transfer/manage-stock-transfer.component';
import { StockTransferResolver } from './stock-transfer/manage-stock-transfer/stock-transfer.resolver';
import { StockTransferDetailComponent } from './stock-transfer/stock-transfer-detail/stock-transfer-detail.component';


const routes: Routes = [
  {
    path: 'opening-stock',
    component: OpeningStockComponent,
    data: { claimType: 'inventory_opening_stock_list_opening_stock' },
    canActivate: [AuthGuard]
  },
  {
    path: 'damage-entry',
    component: DamageEntryListComponent,
    // data: { claimType: 'inventory_opening_stock_list_opening_stock' },
    // canActivate: [AuthGuard]
  },
  {
    path: 'damage-entry/manage/:id',
    component: ManageDamageEntryComponent,
    // data: { claimType: 'inventory_opening_stock_list_opening_stock' },
    // canActivate: [AuthGuard],
    resolve: { damageEntry: DamageEntryResolver }
  },
  {
    path: 'damage-entry/detail/:id',
    component: DamageEntryDetailsComponent,
    // data: { claimType: 'inventory_opening_stock_list_opening_stock' },
    // canActivate: [AuthGuard],
    resolve: { damageEntry: DamageEntryResolver }
  },
  {
    path: 'stock-transfer',
    component: StockTransferListComponent,
    // data: { claimType: 'inventory_opening_stock_list_opening_stock' },
    // canActivate: [AuthGuard],
    // resolve: { damageEntry: DamageEntryResolver }
  },
  {
    path: 'stock-transfer/manage/:id',
    component: ManageStockTransferComponent,
    // data: { claimType: 'inventory_opening_stock_list_opening_stock' },
    // canActivate: [AuthGuard],
    resolve: { stockTransfer: StockTransferResolver }
  },
  {
    path: 'stock-transfer/detail/:id',
    component: StockTransferDetailComponent,
    // data: { claimType: 'inventory_opening_stock_list_opening_stock' },
    // canActivate: [AuthGuard],
    resolve: { stockTransfer: StockTransferResolver }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
