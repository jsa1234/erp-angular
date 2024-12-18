import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxListComponent } from './tax-list/tax-list.component';
import { TaxListPresentationComponent } from './tax-list-presentation/tax-list-presentation.component';
import { ManageTaxComponent } from './manage-tax/manage-tax.component';
import { TaxRoutingModule } from './tax-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    TaxListComponent,
    TaxListPresentationComponent,
    ManageTaxComponent
  ],
  imports: [
    CommonModule,
    TaxRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class TaxModule { }
