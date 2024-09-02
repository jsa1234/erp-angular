import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseReturnReportRoutingModule } from './purchase-return-report-routing.module';
import { PurchaseReturnReportComponent } from './purchase-return-report.component';
import { BillWisePurchaseReturnReportComponent } from './bill-wise-purchase-return-report/bill-wise-purchase-return-report.component';
import { DetailedPurchaseReturnReportComponent } from './detailed-purchase-return-report/detailed-purchase-return-report.component';
import { SharedModule } from '@shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PurchaseReturnReportComponent,
    BillWisePurchaseReturnReportComponent,
    DetailedPurchaseReturnReportComponent,
  ],
  imports: [
    CommonModule,
    PurchaseReturnReportRoutingModule,
    SharedModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PurchaseReturnReportModule { }
