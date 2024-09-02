import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleOrderRoutingModule } from './sale-order-routing.module';
import { SaleOrderListComponent } from './sale-order-list/sale-order-list.component';
import { SaleOrderDetailComponent } from './sale-order-detail/sale-order-detail.component';
import { ManageSaleOrderComponent } from './manage-sale-order/manage-sale-order.component';
import { SaleOrderItemsComponent } from './sale-order-list/sale-order-items/sale-order-items.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SaleOrderListComponent,
    SaleOrderDetailComponent,
    ManageSaleOrderComponent,
    SaleOrderItemsComponent
  ],
  imports: [
    CommonModule,
    SaleOrderRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SaleOrderModule { }
