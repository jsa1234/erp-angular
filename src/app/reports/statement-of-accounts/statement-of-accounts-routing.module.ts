import { NgModule } from '@angular/core';
import { StatementOfAccountsComponent } from './statement-of-accounts.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';



const routes: Routes = [
  {
    path:'',
    component: StatementOfAccountsComponent,
     data: { claimType: 'report_ledger_report_ledger_report' },
     canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementOfAccountsRoutingModule { }
