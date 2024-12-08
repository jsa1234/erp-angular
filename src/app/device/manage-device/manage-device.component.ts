import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDevice } from '@core/domain-classes/device';

import { BaseComponent } from 'src/app/base.component';
import { DeviceService } from '../device.service';
import { DeviceActivationStatus } from '@core/domain-classes/enums/device-activation-status';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecurityService } from '@core/security/security.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-manage-device',
  templateUrl: './manage-device.component.html',
  styleUrls: ['./manage-device.component.scss']
})
export class ManageDeviceComponent extends BaseComponent implements OnInit  {
  deviceDetails:IDevice
  deviceActivationStatus = DeviceActivationStatus
  ActivationCode:string[]=[]
  isLoading = false
  branchForm:FormGroup
  branchUUID: string;
  constructor(
    private dialogRef:MatDialogRef<ManageDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private deviceService:DeviceService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private securityService:SecurityService) {
    super();
    this.branchUUID = securityService.getUserDetail().branchUUID
  }

  ngOnInit(): void {
    this.InitializeComponent()
    this.branchForm = this.fb.group({
      branchUUID:[this.branchUUID]
    })
  }



  onCancel(isLoad:boolean){
    this.dialogRef.close(isLoad);
  }

  InitializeComponent(){
    this.deviceDetails =this.data?.device 
    
    this.data?.componentType!='deactivate'? this.ActivationCode = this.splitActcodetoArray(this.deviceDetails?.actCode):''
  }

  ReadyForActivate(deviceUuid:string){
    if(this.branchForm.invalid){
      this.branchForm.markAllAsTouched();
      this.toastr.warning('Please Choose Branch Before Activate Device');
      return;
    }
    const branch = this.branchForm.getRawValue()
    this.deviceService.ReadyForActivate(deviceUuid,branch).subscribe((res:IDevice)=>{

      this.onCancel(true)
    })
  }
  DeActivateDevice(deviceUuid:string,deviceId:number){
    this.deviceService.DeActivateDevice(deviceUuid,deviceId).subscribe((res:IDevice)=>{

      this.onCancel(true)
    })
  }

  RegenerateCode(deviceUuid:string){
    this.isLoading = true
    this.deviceService.RegenereateActCode(deviceUuid).subscribe((res:IDevice)=>{
      
      this.ActivationCode = this.splitActcodetoArray(res.actCode)
    this.isLoading = false

    })

  }

  splitActcodetoArray(code:string):string[]{
    return [code.slice(0,3),code.slice(3,6),code.slice(6,9)]
  }
}
