

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { DailyActivityReportComponent } from './daily-activity-report.component';

const routes: Routes = [
  {
    path:'',
    component: DailyActivityReportComponent,
     data: { claimType: 'report_daily_activity_report_daily_activity_report' },
     canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyActivityReportRoutingModule { }
