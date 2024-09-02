import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemFlagConfiguration } from '@core/domain-classes/device-configuration.interface';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DeviceService } from '../device.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device-configuration',
  templateUrl: './device-configuration.component.html',
  styleUrls: ['./device-configuration.component.scss']
})
export class DeviceConfigurationComponent extends BaseComponent implements OnInit {
deviceConfig:SystemFlagConfiguration[] =[]
isLoading$:boolean
  constructor(
    public translationService: TranslationService,
    private routes:ActivatedRoute,
    private deviceService:DeviceService,
    private toasterService:ToastrService,
    private router:Router
  ) { super() }

  ngOnInit(): void {
    this. getDeviceDetails()
  }

  getDeviceDetails(){
    this.sub$.sink = this.routes.data.subscribe((data:{deviceConfig:SystemFlagConfiguration[]})=>{
      if(!data.deviceConfig)return;
      this.deviceConfig = data.deviceConfig
    })
  }
  save(config:SystemFlagConfiguration[]){
    this.isLoading$=true
    const outputArray : SystemFlagConfiguration[]= config.map((item: SystemFlagConfiguration) => {
      return {
        deviceUUID: item.deviceUUID,
        deviceSystemFlagUUID: item.deviceSystemFlagUUID,
        systemFlagUUID: item.systemFlagUUID,
        value: item.value
      };
    });
    this.deviceService.UpdateDeviceSystemFlag(outputArray).subscribe((res)=>{
      this.toasterService.success(this.translationService.getValue('RESPONSE_MESSAGE.CONFIGURATION_UPDATE'))
      this.router.navigate(['/device'], { relativeTo: this.routes });
      this.isLoading$ =false

    },
    ()=>{ 
      this.toasterService.error('Device Configurations Update Failed')
      this.isLoading$ = false
    })
  }
}
