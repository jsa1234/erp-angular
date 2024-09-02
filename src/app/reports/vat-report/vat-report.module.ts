import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VATReportComponent } from './vat-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { ChemicalPurchaseReportRoutingModule } from './vat-report-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { InputReportComponent } from './detailed-report/input-report/input-report.component';
import { OutputReportComponent } from './detailed-report/output-report/output-report.component';



@NgModule({
  declarations: [
    VATReportComponent,
    SummaryReportComponent,
    InputReportComponent,
    OutputReportComponent
  ],
  imports: [
    CommonModule,
    ChemicalPurchaseReportRoutingModule,
    FormsModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class VATReportModule { }
