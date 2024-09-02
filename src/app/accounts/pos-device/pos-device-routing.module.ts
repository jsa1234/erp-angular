import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPosDeviceComponent } from './list-pos-device/list-pos-device.component';
import { ManagePosDeviceComponent } from './manage-pos-device/manage-pos-device.component';
import { DetailPosDeviceComponent } from './detail-pos-device/detail-pos-device.component';
import { PosDeviceResolver } from './pos-device.resolver';

const routes: Routes = [
  {
    path:'',
    component:ListPosDeviceComponent,
  },
  {
    path:'manage/:id',
    component:ManagePosDeviceComponent,
    resolve:{posDevice:PosDeviceResolver}
  },
  {
    path:'detail/:id',
    component:DetailPosDeviceComponent,
    resolve:{posDevice:PosDeviceResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosDeviceRoutingModule { }
