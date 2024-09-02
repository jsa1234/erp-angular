import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Module } from '@core/domain-classes/module';
import { Page } from '@core/domain-classes/page';
import { ModuleService } from '@core/services/modules.service';
import { PageService } from '@core/services/page.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss']
})
export class ManagePageComponent extends BaseComponent implements OnChanges {

  isEdit: boolean = false;
  moduleList: Module[];
  constructor(
    public dialogRef: MatDialogRef<ManagePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { page: Page, moduleList: Module[] },
    private pageService: PageService,
    private toastrServoce: ToastrService,
    private translationService: TranslationService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] != null) {
      if (this.data.page.id) {
        this.isEdit = true;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  savePage(): void {
    if (this.data.page.id) {
      this.pageService.update(this.data.page).subscribe(d => {
        this.toastrServoce.success(this.translationService.getValue('PAGE_UPDATED_SUCCESSFULLY'));
        this.dialogRef.close();
      });
    } else {
      this.pageService.add(this.data.page).subscribe(() => {
        this.toastrServoce.success(this.translationService.getValue('PAGE_ADDED_SUCCESSFULLY'));
        this.dialogRef.close();
      });
    }
  }
}
