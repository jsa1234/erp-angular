import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { CustomValidators } from '@shared/validators/password-mismatch-validation';
import { DeviceService } from '../../device.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-pin',
  templateUrl: './reset-pin.component.html',
  styleUrls: ['./reset-pin.component.scss'],
})
export class ResetPinComponent implements OnInit {
  pinCodeResetForm: FormGroup;
  showPin: boolean = false;
  showConfirmPin: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ResetPinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,

    public translationService: TranslationService,
    private fb: FormBuilder,
    private deviceService:DeviceService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm()
  }

  onCancel(isLoad: boolean): void {
    this.dialogRef.close(isLoad);
  }
  createForm() {
    this.pinCodeResetForm = this.fb.group({
      id: [this.data],
      loginPin: ['',[Validators.required]],
      confirmLoginPin: [''],
    },{validators:CustomValidators.PasswordMatchValidator
    });
  }
  get f() {
    return this.pinCodeResetForm.controls;
  }
  save(){
    if(this.pinCodeResetForm.invalid){
      this.pinCodeResetForm.markAllAsTouched();
      return;
    }
    const restPinObj = this.pinCodeResetForm.value
    this.deviceService.UpdateDeviceUserPin(restPinObj).subscribe(()=>{
      this.toastrService.success(this.translationService.getValue('RESPONSE_MESSAGE.SUCCESSFULLY_RESET_PASSWORD'))
      this.onCancel(true)
    })
  }
}
