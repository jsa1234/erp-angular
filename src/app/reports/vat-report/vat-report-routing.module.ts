import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { VATReportComponent } from './vat-report.component';

const routes: Routes = [
  {
    path:'',
    component: VATReportComponent,
    data: { claimType: ['report_vat_report_vat_report_summary','report_vat_report_output_statement','report_vat_report_input_statement'] },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChemicalPurchaseReportRoutingModule { }
