import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bank } from '@core/domain-classes/bank.interface';
import { MerchantAccountModal } from '@core/domain-classes/merchant-account-modal.interface';
import { MerchantModalForm } from '@core/domain-classes/merchant-modal-form.interface';

@Component({
  selector: 'app-merchant-account-modal',
  templateUrl: './merchant-account-modal.component.html',
  styleUrls: ['./merchant-account-modal.component.scss']
})
export class MerchantAccountModalComponent implements OnInit {
  modalForm:FormGroup;

  constructor(
    private fb:FormBuilder, 
    public dialogRef: MatDialogRef<MerchantAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MerchantAccountModal,) { }

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      banks:['',this.data.isBank?Validators.required:''],
      posDevices:['',this.data.isDevice?Validators.required:''],
      posPrinters:['',this.data.isPosPrinter?Validators.required:'']
    })
  }
  onCancel(banks: Bank): void {
    this.dialogRef.close(banks);
  }

  add():void{
    if(this.modalForm.invalid){
      this.modalForm.markAllAsTouched();
      return;
    }
    const banks:MerchantModalForm = this.modalForm.getRawValue()
    this.dialogRef.close(banks)
  }
}
