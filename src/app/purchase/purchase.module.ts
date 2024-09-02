import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '@shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import { PurchaseItemComponent } from './purchase-list/purchase-item/purchase-item.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import { PurchaseDetailResolver } from './purchase-detail/purchase-details.resolver';
import { PurchaseBarcodeComponent } from './purchase-barcode/purchase-barcode.component';
import { BarcodeResolver } from './purchase-barcode/barcode.resolver';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PurchaseManageComponent } from './purchase-manage/purchase-manage.component';
import { PriceUpdateDialogComponent } from './purchase-manage/price-update-dialog/price-update-dialog.component';


@NgModule({
  declarations: [
    PurchaseListComponent,
    PurchaseItemComponent,
    PurchaseDetailComponent,
    PurchaseBarcodeComponent,
    PurchaseManageComponent,
    PriceUpdateDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PurchaseRoutingModule,
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
    MatDialogModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers:[
    PurchaseDetailResolver,
    BarcodeResolver,
    DecimalPipe
  ]
})
export class PurchaseModule { }
