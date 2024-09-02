import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { FinancialYearComponent } from './financial-year/financial-year.component';
import { YearEndProcessComponent } from './year-end-process/year-end-process.component';
import { MatTableModule } from '@angular/material/table';
import { YearEndProcessResolver } from './year-end-process/year-end-process.resolver';
import { SharedModule } from '@shared/shared.module';
import { ViewYearEndProcessComponent } from './year-end-process/view-year-end-process/view-year-end-process.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewYearEndProcessResolver } from './year-end-process/view-year-end-process/view-year-end-proess.resolver';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListYearEndProcessComponent } from './year-end-process/list-year-end-process/list-year-end-process.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    FinancialYearComponent,
    YearEndProcessComponent,
    ViewYearEndProcessComponent,
    ListYearEndProcessComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTableModule,
    SharedModule,
    MatTabsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  providers:[
    YearEndProcessResolver,
    ViewYearEndProcessResolver
  ]
})
export class SettingsModule { }
