import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { POSDevice } from '@core/domain-classes/pos-device.interface';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { PosDeviceService } from 'src/app/accounts/pos-device/pos-device.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-pos-merchant-account-devices',
  templateUrl: './pos-merchant-account-devices.component.html',
  styleUrls: ['./pos-merchant-account-devices.component.scss']
})
export class PosMerchantAccountDevicesComponent extends BaseComponent implements OnInit {
  imagePath$: Observable<string> = of(environment.dummyImage);
  isLoading$: Observable<boolean> = of(false);
  posDevice: POSDevice;
  constructor(private posDeviceService:PosDeviceService,
    public dialogRef: MatDialogRef<PosMerchantAccountDevicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string,) {
    super();
  }

  ngOnInit(): void {
    this.getPOSDeviceDetails()
  }
  onCancel(posDevice: POSDevice): void {
    this.dialogRef.close(posDevice);
  }
  getPOSDeviceDetails(): void {
    this.isLoading$ = of(true);
    this.sub$.sink = this.posDeviceService.getSinglePosDevice(this.data).subscribe((posDevice:POSDevice)=>{
      this.posDevice = posDevice
      this.imagePath$ =this.posDevice.imagePath?of(environment.apiUrl+this.posDevice.imagePath): of(environment.dummyImage);
      this.isLoading$ = of(false);
    },
    ()=> this.isLoading$ = of(false))
  }
}
