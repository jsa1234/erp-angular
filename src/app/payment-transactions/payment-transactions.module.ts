import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentTransactionsRoutingModule } from './payment-transactions-routing.module';
import { PaymentTransactionsListComponent } from './payment-transactions-list/payment-transactions-list.component';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PaymentTransactionsListComponent
  ],
  imports: [
    CommonModule,
    PaymentTransactionsRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class PaymentTransactionsModule { }
