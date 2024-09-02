import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateRoutingModule } from './state-routing.module';
import { StateListComponent } from './state-list/state-list.component';
import { StateListPresentationComponent } from './state-list-presentation/state-list-presentation.component';
import { ManageStateComponent } from './manage-state/manage-state.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    StateListComponent,
    StateListPresentationComponent,
    ManageStateComponent,
   
  ],
  imports: [
    CommonModule,
    StateRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule
  ]
})
export class StateModule { }
