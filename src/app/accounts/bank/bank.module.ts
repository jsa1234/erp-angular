import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { BankRoutingModule } from './bank-routing.module';
import { BankResolver } from './bank.resolver';
import { ManageBankComponent } from './manage-bank/manage-bank.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    BankListComponent,
    ManageBankComponent,
    BankDetailComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers:[
    BankResolver
  ],
  exports:[
    BankDetailComponent
  ]
})
export class BankModule { }
