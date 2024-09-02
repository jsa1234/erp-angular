import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Module } from '@core/domain-classes/module';
import { ModuleService } from '@core/services/modules.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-manage-module',
  templateUrl: './manage-module.component.html',
  styleUrls: ['./manage-module.component.scss']
})
export class ManageModuleComponent extends BaseComponent implements OnChanges {
  isEdit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ManageModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Module,
    private moduleService: ModuleService,
    private toastrService: ToastrService,
    private translationService: TranslationService
  ) {
    super()
   }

   ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data.id) {
        this.isEdit = true;
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  saveModule(): void {
    if (this.data.id) {
      this.moduleService.update(this.data).subscribe(() => {
        this.toastrService.success( this.translationService.getValue('MODULE_UPDATED_SUCCESSFULLY'));
        this.dialogRef.close();
      });
    } else {
      this.moduleService.add(this.data).subscribe(() => {
        this.toastrService.success(this.translationService.getValue('MODULE_SAVED_SUCCESSFULLY'));
        this.dialogRef.close();
      });
    }
  }

}
