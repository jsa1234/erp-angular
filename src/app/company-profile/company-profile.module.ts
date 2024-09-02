import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile.component';
import { CompanyProfileRoutingModule } from './company-profile-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CompanyConfigurationComponent } from './company-configuration/company-configuration.component';
import { CompanyProfileResolver } from './company-profile.resolver';
import { CompanyConfigurationResolver } from './company-configuration/company-configurations.resolver';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [CompanyProfileComponent, CompanyConfigurationComponent],
  imports: [
    CommonModule,
    CompanyProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  providers:[CompanyProfileResolver,CompanyConfigurationResolver]
})
export class CompanyProfileModule { }
