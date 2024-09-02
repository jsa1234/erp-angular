import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleReturnReportRoutingModule } from './sale-return-report-routing.module';
import { BillWiseSaleReturnReportComponent } from './bill-wise-sale-return-report/bill-wise-sale-return-report.component';
import { DetailedSaleReturnReportComponent } from './detailed-sale-return-report/detailed-sale-return-report.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/shared.module';
import { SaleReturnReportComponent } from './sale-return-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    BillWiseSaleReturnReportComponent,
    DetailedSaleReturnReportComponent,
    SaleReturnReportComponent
  ],
  imports: [
    CommonModule,
    SaleReturnReportRoutingModule,
    MatTabsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule

  ]
})
export class SaleReturnReportModule { }
