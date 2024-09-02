import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateListComponent } from './state-list/state-list.component';
import { AuthGuard } from '@core/security/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:StateListComponent,
    data: { claimType: 'location_state_list_state' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
