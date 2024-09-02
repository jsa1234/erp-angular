import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { ManageCountryComponent } from './manage-country/manage-country.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryListPresentationComponent } from './country-list-presentation/country-list-presentation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ManageCountryComponent,
    CountryListComponent,
    CountryListPresentationComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule,
    MatSlideToggleModule,
    MatPaginatorModule
  ]
})
export class CountryModule { }
