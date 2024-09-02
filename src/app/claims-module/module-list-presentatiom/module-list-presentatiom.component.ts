import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Module } from '@core/domain-classes/module';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ManageModuleComponent } from '../manage-module/manage-module.component';

@Component({
  selector: 'app-module-list-presentatiom',
  templateUrl: './module-list-presentatiom.component.html',
  styleUrls: ['./module-list-presentatiom.component.scss']
})
export class ModuleListPresentatiomComponent extends BaseComponent implements OnInit {
  @Input() modules: Module[];
  @Input() loading: boolean = false;
  @Output() deleteModuleHandler: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[] = ['action', 'name'];
  constructor(
    private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
    private translationService: TranslationService
  ) { 
    super()
  }

  ngOnInit(): void {
  }

  deleteModule(module: Module): void {
    const areU = this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE');
    this.sub$.sink = this.commonDialogService.deleteConformationDialog(`${areU} :: ${module.name}`)
      .subscribe(isTrue => {
        if (isTrue) {
          this.deleteModuleHandler.emit(module.id);
        }
      });
  }

  manageModule(module: Module): void {
    this.dialog.open(ManageModuleComponent, {
      width: '350px',
      data: Object.assign({}, module)
    });
  }

}
