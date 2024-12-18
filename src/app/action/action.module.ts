import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionListComponent } from './action-list/action-list.component';
import { ActionRoutingModule } from './action-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ManageActionComponent } from './manage-action/manage-action.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionListPresentationComponent, FilterPipe } from './action-list-presentation/action-list-presentation.component';
import { SharedModule } from '@shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ActionListComponent,
    ManageActionComponent,
    ActionListPresentationComponent,
  FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ActionRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule,
    MatSlideToggleModule
  ]

})
export class ActionModule { }
