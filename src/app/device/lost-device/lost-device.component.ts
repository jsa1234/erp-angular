import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageDeviceComponent } from '../manage-device/manage-device.component';
import { IDevice } from '@core/domain-classes/device';
import { DeviceService } from '../device.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/base.component';
import { DeviceActivationStatus } from '@core/domain-classes/enums/device-activation-status';

@Component({
  selector: 'app-lost-device',
  templateUrl: './lost-device.component.html',
  styleUrls: ['./lost-device.component.scss']
})
export class LostDeviceComponent extends BaseComponent implements OnInit {
  deviceDetails:IDevice
  deviceTransferForm:FormGroup
  deviceActivationStatus = DeviceActivationStatus
  devices: IDevice[];
  constructor(
    private dialogRef:MatDialogRef<ManageDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private deviceService:DeviceService,
    private fb:FormBuilder
  ) {super() }

  ngOnInit(): void {
    this.InitializeComponent()
    this.getDevices()
  }

  onCancel(isLoad:boolean){
    this.dialogRef.close(isLoad);
  }

  InitializeComponent(){
    this.deviceDetails =this.data?.device
    this.createForm(this.deviceDetails.deviceUUID)
  }

  createForm(deviceUUID:string){
    this.deviceTransferForm = this.fb.group({
      oldDeviceUUID:[deviceUUID],
      newDeviceUUID:['',[Validators.required]]
    })
  }
  get newDevice() { return this.deviceTransferForm.get('newDeviceUUID'); }

  update(){
    if(this.deviceTransferForm.invalid){
      this.deviceTransferForm.markAllAsTouched()
      return;
    }

    let deviceData = this.deviceTransferForm.value
    this.deviceService.DeviceTransfer(deviceData).subscribe((res:IDevice)=>{
      this.onCancel(true)
    })
  }

  getDevices() {
    this.sub$.sink = this.deviceService.deviceList$.subscribe((res: IDevice[]) => {
      this.devices = res.filter(device => device.deviceUUID !== this.deviceDetails.deviceUUID && device.actStatus == DeviceActivationStatus.PENDING);
    }); 
  }
}
