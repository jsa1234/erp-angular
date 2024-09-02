import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleReturnReportComponent } from './sale-return-report.component';

const routes: Routes = [
  {
    path:'',
    component:SaleReturnReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleReturnReportRoutingModule { }
