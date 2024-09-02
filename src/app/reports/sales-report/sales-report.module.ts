import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReportComponent } from './sales-report.component';
// import { SalesOrderItemsComponent } from './sales-order-items/sales-order-items.component';
import { SalesOrderReportRoutingModule } from './sales-report-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import {MatTabsModule} from '@angular/material/tabs';
import { BillWiseSalesReportComponent } from './bill-wise-sales-report/bill-wise-sales-report.component';
import { ProductWiseSalesReportComponent } from './product-wise-sales-report/product-wise-sales-report.component';
import { CustomerWiseSalesReportComponent } from './customer-wise-sales-report/customer-wise-sales-report.component';
import { DetailedSalesReportComponent } from './detailed-sales-report/detailed-sales-report.component';



@NgModule({
  declarations: [
    SalesReportComponent,
    BillWiseSalesReportComponent,
    ProductWiseSalesReportComponent,
    CustomerWiseSalesReportComponent,
    DetailedSalesReportComponent,
    // SalesItemsComponent,
  ],
  imports: [
    CommonModule,
    SalesOrderReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTabsModule
  ]
})
export class SalesReportModule { }
