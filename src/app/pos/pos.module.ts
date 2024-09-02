import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosMainComponent } from './pos-main/pos-main.component';
import { PosTabComponent } from './pos-tab/pos-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    PosMainComponent,
    PosTabComponent
  ],
  imports: [
    CommonModule,
    PosRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    MatCardModule,
    InfiniteScrollModule
  ],
  exports:[
    PosMainComponent
  ]
})
export class PosModule { }
