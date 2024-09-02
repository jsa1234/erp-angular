import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosDeviceRoutingModule } from './pos-device-routing.module';
import { ListPosDeviceComponent } from './list-pos-device/list-pos-device.component';
import { ManagePosDeviceComponent } from './manage-pos-device/manage-pos-device.component';
import { DetailPosDeviceComponent } from './detail-pos-device/detail-pos-device.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ListPosDeviceComponent,
    ManagePosDeviceComponent,
    DetailPosDeviceComponent
  ],
  imports: [
    CommonModule,
    PosDeviceRoutingModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class PosDeviceModule { }
