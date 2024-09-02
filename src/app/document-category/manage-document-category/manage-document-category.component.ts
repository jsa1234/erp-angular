import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentCategory } from '@core/domain-classes/document-category';
import { DocumentCategoryService } from '@core/services/document-category.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-manage-document-category',
  templateUrl: './manage-document-category.component.html',
  styleUrls: ['./manage-document-category.component.scss']
})
export class ManageDocumentCategoryComponent extends BaseComponent implements OnChanges {
  isEdit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ManageDocumentCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DocumentCategory,
    private categoryService: DocumentCategoryService) {
    super();
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

  saveCategory(): void {
    if (this.data.id) {
      this.categoryService.update(this.data);
    } else {
      this.categoryService.add(this.data);
    }
    this.dialogRef.close();
  }

}
