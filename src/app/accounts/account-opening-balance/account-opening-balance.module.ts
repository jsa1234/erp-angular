import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountOpeningBalanceRoutingModule } from './account-opening-balance-routing.module';
import { AccountOpeningBalanceListComponent } from './account-opening-balance-list/account-opening-balance-list.component';
import { ManageAccountOpeningBalanceComponent } from './manage-account-opening-balance/manage-account-opening-balance.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    AccountOpeningBalanceListComponent,
    ManageAccountOpeningBalanceComponent
  ],
  imports: [
    CommonModule,
    AccountOpeningBalanceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatRadioModule
  ]
})
export class AccountOpeningBalanceModule { }
