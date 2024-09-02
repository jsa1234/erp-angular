import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalDetailComponent } from './journal-detail/journal-detail.component';
import { JournalDetailResolverService } from './journal-detail/journal-detail.resolver';
import { JournalListComponent } from './journal-list/journal-list.component';
import { AuthGuard } from '@core/security/auth.guard';
import { ManageJournalComponent } from './manage-journal/manage-journal.component';
import { ManageJournalResolver } from './manage-journal/manage-journal.resolver';

const routes: Routes = [
  {
    path: '',
    component: JournalListComponent,
    data: { claimType: 'account_journal_list_journal' },
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: JournalDetailComponent,
    resolve:{journal:JournalDetailResolverService},
    data: { claimType:'account_journal_view_journal'},
    canActivate: [AuthGuard]
  },
  {
    path: 'manage/:id',
    component: ManageJournalComponent,
    resolve:{journal:ManageJournalResolver},
    data: { claimType:['account_journal_create_journal','account_journal_edit_journal']},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }
