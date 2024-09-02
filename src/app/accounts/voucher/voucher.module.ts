import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherRoutingModule } from './voucher-routing.module';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { SharedModule } from '@shared/shared.module';
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
import { MatDividerModule } from '@angular/material/divider';
import { PaymentVocherItemComponent } from './voucher-list/payment-vocher-item/payment-vocher-item.component';
import { VoucherDetailResolverService } from './voucher-detail/voucher-detail.resolver';
import { ManageVoucherComponent } from './manage-voucher/manage-voucher.component';


@NgModule({
  declarations: [
    VoucherDetailComponent,
    VoucherListComponent,
    PaymentVocherItemComponent,
    ManageVoucherComponent,

  ],
  imports: [
    CommonModule,
    VoucherRoutingModule,
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
    MatDividerModule
  ],
  providers:[
    VoucherDetailResolverService
  ]
})
export class VoucherModule { }
