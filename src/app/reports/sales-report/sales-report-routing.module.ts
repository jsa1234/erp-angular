import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { SalesReportComponent } from './sales-report.component';



const routes: Routes = [
  {
    path:'',
    component: SalesReportComponent,
     data: { claimType: ['report_sale_report_product_wise_sale_report','report_sale_report_customer_wise_sale_report','report_sale_report_bill_wise_sale_report','report_sale_report_detailed_sale_report'] },
     canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderReportRoutingModule { }
