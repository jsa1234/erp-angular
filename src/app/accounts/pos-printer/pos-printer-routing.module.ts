import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePosPrinterComponent } from './manage-pos-printer/manage-pos-printer.component';
import { PosPrinterDetailComponent } from './pos-printer-detail/pos-printer-detail.component';
import { PosPrinterListComponent } from './pos-printer-list/pos-printer-list.component';
import { PosPrinterResolver } from './pos-printer.resolver';

const routes: Routes = [
  {
    path:'',
    component:PosPrinterListComponent
  },
  {
    path:'detail/:id',
    component:PosPrinterDetailComponent,
    resolve:{posPrinter:PosPrinterResolver}
  },
  {
    path:'manage/:id',
    component:ManagePosPrinterComponent,
    resolve:{posPrinter:PosPrinterResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosPrinterRoutingModule { }
