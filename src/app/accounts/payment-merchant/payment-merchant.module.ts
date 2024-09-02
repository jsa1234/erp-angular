import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { BankModule } from '../bank/bank.module';
import { PosMerchantAccountBanksComponent } from '../../shared/components/pos-merchant-account-banks/pos-merchant-account-banks.component';
import { ManagePaymentMerchantComponent } from './manage-payment-merchant/manage-payment-merchant.component';
import { MerchantAccountModalComponent } from '../../shared/components/merchant-account-modal/merchant-account-modal.component';
import { PaymentMerchantDetailComponent } from './payment-merchant-detail/payment-merchant-detail.component';
import { PaymentMerchantListComponent } from './payment-merchant-list/payment-merchant-list.component';
import { PaymentMerchantRoutingModule } from './payment-merchant-routing.module';
import { PosMerchantAccountResolver } from './pos-merchant-account.resolver';

@NgModule({
  declarations: [
    PaymentMerchantListComponent,
    ManagePaymentMerchantComponent,
    PaymentMerchantDetailComponent,
    MerchantAccountModalComponent,
    PosMerchantAccountBanksComponent,
  ],
  imports: [
    CommonModule,
    PaymentMerchantRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    BankModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  providers:[
    PosMerchantAccountResolver
  ]
})
export class PaymentMerchantModule { }
