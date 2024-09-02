import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, KeyValuePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TopCustomersComponent } from './top-customers/top-customers.component';
import { TopUsersComponent } from './top-users/top-users.component';
import { TopSellingProductsComponent } from './top-selling-products/top-selling-products.component';
import { FinancialInsightsChartComponent } from './financial-insights-chart/financial-insights-chart.component';
import { InventoryOverviewComponent } from './inventory-overview/inventory-overview.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [DashboardComponent, TopCustomersComponent, TopUsersComponent, TopSellingProductsComponent, FinancialInsightsChartComponent, InventoryOverviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    ChartsModule,
    MatSelectModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatButtonToggleModule
  ]
})
export class DashboardModule { }
