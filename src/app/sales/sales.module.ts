import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesRoutingModule } from './sales-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@shared/shared.module';
import { MatDividerModule } from '@angular/material/divider'
import { SalesOrderItemsComponent } from './sales-list/sales-items/sales-items.component';
import { SalesResolverService } from './sales-detail/sales-detail.resolver';
import { SalesDetailComponent } from './sales-detail/sales-detail.component';
import { SimplifiedInvoiceDetailComponent } from './sales-detail/simplified-invoice-detail/simplified-invoice-detail.component';
import { DetailedInvoiceDetailComponent } from './sales-detail/detailed-invoice-detail/detailed-invoice-detail.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    SalesListComponent,
    SalesOrderItemsComponent,
    SalesDetailComponent,
    SimplifiedInvoiceDetailComponent,
    DetailedInvoiceDetailComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    QRCodeModule
  ],
  providers: [
    SalesResolverService
  ]
})
export class SalesModule { }
