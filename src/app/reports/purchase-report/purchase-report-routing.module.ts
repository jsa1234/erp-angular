import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { PurchaseReportComponent } from './purchase-report.component';


const routes: Routes = [
  {
    path:'',
    component: PurchaseReportComponent,
     data: { claimType: ['report_purchase_report_product_wise_purchase_report','report_purchase_report_supplier_wise_purchase_report','report_purchase_report_bill_wise_purchase_report','report_purchase_report_detailed_purchase_report'] },
     canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseReportRoutingModule { }
