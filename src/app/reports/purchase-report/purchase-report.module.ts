import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseReportComponent } from './purchase-report.component';
// import { PurchaseOrderItemComponent } from './purchase-order-item/purchase-order-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { PurchaseReportRoutingModule } from './purchase-report-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { DetailedReportComponent } from './detailed-report/detailed-report.component';
import { ProductWiseReportComponent } from './product-wise-report/product-wise-report.component';
import { SupplierWiseReportComponent } from './supplier-wise-report/supplier-wise-report.component';
import { BillWiseReportComponent } from './bill-wise-report/bill-wise-report.component';



@NgModule({
  declarations: [
    PurchaseReportComponent,
    DetailedReportComponent,
    ProductWiseReportComponent,
    SupplierWiseReportComponent,
    BillWiseReportComponent,
  ],
  imports: [
    CommonModule,
    PurchaseReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class PurchaseReportModule { }
