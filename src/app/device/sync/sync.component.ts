import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device, IDevice } from '@core/domain-classes/device';
import { DeviceActivationStatus } from '@core/domain-classes/enums/device-activation-status';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent extends BaseComponent implements OnInit {
  deviceDetail: Device;
  deviceActivationStatus = DeviceActivationStatus
  constructor(
    public translationService: TranslationService,
    private routes: ActivatedRoute,
  ) { super()}

  ngOnInit(): void {
    this.getDeviceDetails()
  }

  getDeviceDetails(){
    this.sub$.sink = this.routes.data.subscribe((data:{device:IDevice})=>{
      if(!data.device)return;

      this.deviceDetail = new Device(data.device)
    })
  }
}
