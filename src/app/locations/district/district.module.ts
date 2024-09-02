import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictRoutingModule } from './district-routing.module';
import { DistrictListComponent } from './district-list/district-list.component';
import { DistrictListPresentationComponent } from './district-list-presentation/district-list-presentation.component';
import { ManageDistrictComponent } from './manage-district/manage-district.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    DistrictListComponent,
    DistrictListPresentationComponent,
    ManageDistrictComponent,
 
  ],
  imports: [
    CommonModule,
    DistrictRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule
  ]
})
export class DistrictModule { }
