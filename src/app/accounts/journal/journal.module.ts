import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalDetailComponent } from './journal-detail/journal-detail.component';
import { JournalListComponent } from './journal-list/journal-list.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { JournalItemComponent } from './journal-list/journal-item/journal-item.component';
import { JournalDetailResolverService } from './journal-detail/journal-detail.resolver';
import { ManageJournalComponent } from './manage-journal/manage-journal.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    JournalDetailComponent,
    JournalListComponent,
    JournalItemComponent,
    ManageJournalComponent,
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ScrollingModule,
    MatCheckboxModule
  ],
  providers: [
    JournalDetailResolverService
  ]
})
export class JournalModule { }
