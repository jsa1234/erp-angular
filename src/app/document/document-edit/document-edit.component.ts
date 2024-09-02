import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDocument } from '@core/domain-classes/document-info';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss'],
})
export class DocumentEditComponent extends BaseComponent implements OnInit {
  documentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DocumentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDocument,
    private toastrService: ToastrService,
    private documentService: DocumentService,
    private translationService: TranslationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createDocumentForm();
    this.patchDocumentForm();
  }
  patchDocumentForm() {
    this.documentForm.patchValue(this.data);
  }

  createDocumentForm() {
    this.documentForm = this.fb.group({
      documentNoId: [''],
      documentType: [''],
      docPrefixLength: [''],
      docPrefix: ['',[Validators.required,Validators.maxLength(5)]],
      lastDocNo: ['',Validators.required],
      docNoLength: [''],
      deviceCode: [''],
      documentName: [''],
      consolidatedDocumentNo: [''],
    });
  }
  get form(){
    return this.documentForm.controls
  }
  

  SaveDocument() {
    if (this.documentForm.invalid) {
      this.documentForm.markAllAsTouched();
      return;
    }
    this.sub$.sink = this.documentService
      .updateDocumentNumber(this.documentForm.getRawValue())
      .subscribe((c) => {
        this.toastrService.success(
          this.translationService.getValue('DOCUMENT_UPDATE_SUCCESSFULLY')
        );
        this.dialogRef.close(true);
      });
  }




  onDocumentCancel() {
    this.dialogRef.close(false);
  }
}
