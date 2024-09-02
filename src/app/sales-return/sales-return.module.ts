import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { SaleReturnRoutingModule } from './sales-return-routing.module';
import { SaleReturnListComponent } from './sales-return-list/sales-return-list.component';
import { SaleReturnComponent } from './sales-return/sales-return.component';
import { SalesReturnResolverService } from './sales-return/sale-return-detail.resolver';
import DetailedSaleReturnComponent from './sales-return/detailed-sale-return/detailed-sale-return.component';
import { SimplifiedSaleReturnComponent } from './sales-return/simplified-sale-return/simplified-sale-return.component';
import { SaleReturnItemComponent } from './sales-return-list/sales-return-item/sales-return-item.component';



@NgModule({
  declarations: [
    SaleReturnListComponent,
     SaleReturnComponent,
    SaleReturnItemComponent,
    DetailedSaleReturnComponent,
    SimplifiedSaleReturnComponent
  ],
  imports: [
    CommonModule,
    SaleReturnRoutingModule,
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
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers:[SalesReturnResolverService]
})
export class SaleReturnModule { }
