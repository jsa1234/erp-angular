import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialYearComponent } from './financial-year/financial-year.component';
import { YearEndProcessComponent } from './year-end-process/year-end-process.component';
import { YearEndProcessResolver } from './year-end-process/year-end-process.resolver';
import { ViewYearEndProcessComponent } from './year-end-process/view-year-end-process/view-year-end-process.component';
import { ViewYearEndProcessResolver } from './year-end-process/view-year-end-process/view-year-end-proess.resolver';
import { ListYearEndProcessComponent } from './year-end-process/list-year-end-process/list-year-end-process.component';

const routes: Routes = [
  {
    path:'financial-year',
    component:FinancialYearComponent
  },
  {
    path:'year-end-process',
    component:YearEndProcessComponent,
    children:[
      {
        path:'',
        component:ListYearEndProcessComponent,
        resolve:{currentFinancialYear:YearEndProcessResolver},
      },
      {
        path:'view/:deviceUUID/:financialYearUUID',
        component:ViewYearEndProcessComponent,
        resolve:{financialReport:ViewYearEndProcessResolver}
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
