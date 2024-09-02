import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { BaseComponent } from 'src/app/base.component';
import { Page } from '@core/domain-classes/page';
import { ManagePageComponent } from '../manage-page/manage-page.component';
import { TranslationService } from '@core/services/translation.service';
import { Module } from '@core/domain-classes/module';
import { ModuleService } from '@core/services/modules.service';

@Component({
  selector: 'app-page-list-presentation',
  templateUrl: './page-list-presentation.component.html',
  styleUrls: ['./page-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageListPresentationComponent extends BaseComponent implements OnInit {
  searchQuery: string = '';
  @Input() pages: Page[];
  @Input() moduleList: Module[];
  @Input() loading: boolean;
  @Output() deletePageHandler: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[] = ['action', 'name','showInWeb','showInMob'];

  constructor(
    private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
    private translationService: TranslationService,
    private moduleService:ModuleService
  ) {
    super();
  }

  ngOnInit(): void {

  }

  deletePage(page: Page): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${page.name}`)
      .subscribe(isTrue => {
        if (isTrue) {
          this.deletePageHandler.emit(page.id);
        }
      });
  }


  managePage(page: Page): void {
    this.dialog.open(ManagePageComponent, {
      width: '350px',
      data: {
        page: Object.assign({}, page),
        moduleList: this.moduleList
      }
    });
  }
  
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item =>
      item.name.toLowerCase().includes(searchText)
    );
  }
}
