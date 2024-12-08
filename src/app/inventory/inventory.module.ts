import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InventorySourcePipe } from './inventory-source.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { OpeningStockComponent } from './opening-stock/opening-stock.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { DamageEntryListComponent } from './damage-entry/damage-entry-list/damage-entry-list.component';
import { ManageDamageEntryComponent } from './damage-entry/manage-damage-entry/manage-damage-entry.component';
import { DamageEntryDetailsComponent } from './damage-entry/damage-entry-details/damage-entry-details.component';
import { DamageEntryItemComponent } from './damage-entry/damage-entry-list/damage-entry-item/damage-entry-item.component';
import { DamageEntryResolver } from './damage-entry/manage-damage-entry/damage-entry.resolver';
import { ManageStockTransferComponent } from './stock-transfer/manage-stock-transfer/manage-stock-transfer.component';
import { StockTransferListComponent } from './stock-transfer/stock-transfer-list/stock-transfer-list.component';
import { StockTransferItemComponent } from './stock-transfer/stock-transfer-list/stock-transfer-item/stock-transfer-item.component';
import { StockTransferDetailComponent } from './stock-transfer/stock-transfer-detail/stock-transfer-detail.component';
import { CurrentStockComponent } from './current-stock/current-stock.component';



@NgModule({
  declarations: [

    InventorySourcePipe,
    OpeningStockComponent,
    CurrentStockComponent,
    DamageEntryListComponent,
    ManageDamageEntryComponent,
    DamageEntryDetailsComponent,
    DamageEntryItemComponent,
    ManageStockTransferComponent,
    StockTransferListComponent,
    StockTransferItemComponent,
    StockTransferDetailComponent,

  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularEditorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers:[
    DamageEntryResolver
  ]
})
export class InventoryModule { }
