import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { PurchaseReturnItemComponent } from './purchase-return-list/purchase-return-item/purchase-return-item.component';
import { PurchaseReturnListComponent } from './purchase-return-list/purchase-return-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { PurchaseReturnRoutingModule } from './purchase-return-routing.module';
import { PurchaseReturnResolverService } from './purchase-return/purchase-return-detail.resolver';
import { ManagePurchaseReturnComponent } from './manage-purchase-return/manage-purchase-return.component';




@NgModule({
  declarations: [
    PurchaseReturnComponent,
    PurchaseReturnItemComponent,
    PurchaseReturnListComponent,
    ManagePurchaseReturnComponent,
  ],
  imports: [
    CommonModule,
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
    PurchaseReturnRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers:[
    PurchaseReturnResolverService
  ]
})
export class PurchaseReturnModule { }
