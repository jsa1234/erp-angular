import { NgModule } from '@angular/core';
import { CompanyProfileComponent } from './company-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { CompanyProfileResolver } from './company-profile.resolver';
import { CompanyConfigurationComponent } from './company-configuration/company-configuration.component';
import { CompanyConfigurationResolver } from './company-configuration/company-configurations.resolver';

const routes: Routes = [
  {
    path: '',
    component: CompanyProfileComponent,
    data: { claimType:[ 'profile_business_show_business_profile','profile_business_update_business_profile'] },
    canActivate: [AuthGuard],
    resolve: { profile: CompanyProfileResolver },
  },
  {
    path:'configurations',
    component:CompanyConfigurationComponent,
    resolve: { companyConfig: CompanyConfigurationResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProfileRoutingModule { }
