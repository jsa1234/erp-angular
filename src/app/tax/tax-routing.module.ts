import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxListComponent } from './tax-list/tax-list.component';
import { AuthGuard } from '@core/security/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: TaxListComponent,
    data: { claimType: 'product_tax_list_tax' },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule { }
