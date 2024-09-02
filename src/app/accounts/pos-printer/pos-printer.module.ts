import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosPrinterRoutingModule } from './pos-printer-routing.module';
import { PosPrinterListComponent } from './pos-printer-list/pos-printer-list.component';
import { ManagePosPrinterComponent } from './manage-pos-printer/manage-pos-printer.component';
import { PosPrinterDetailComponent } from './pos-printer-detail/pos-printer-detail.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    PosPrinterListComponent,
    ManagePosPrinterComponent,
    PosPrinterDetailComponent
  ],
  imports: [
    CommonModule,
    PosPrinterRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class PosPrinterModule { }
