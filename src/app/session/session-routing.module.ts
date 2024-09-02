import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { SessionComponent } from './session.component';

const routes: Routes = [
  {
    path: '',
    component: SessionComponent,
    data: { claimType: 'profile_user_list_current_online_user' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
