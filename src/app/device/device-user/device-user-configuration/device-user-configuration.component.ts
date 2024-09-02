import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceUser } from '@core/domain-classes/device-user.interface';
import { UserSystemFlag } from '@core/domain-classes/user-system-flags';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DeviceService } from '../../device.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device-user-configuration',
  templateUrl: './device-user-configuration.component.html',
  styleUrls: ['./device-user-configuration.component.scss']
})
export class DeviceUserConfigurationComponent extends BaseComponent implements OnInit {
  isLoading$:boolean
  deviceUserConfig:DeviceUser
  constructor(public translationService:TranslationService,
    private routes:ActivatedRoute,
    private router:Router,
    private deviceService:DeviceService,
    private toasterService:ToastrService) { super()}

  ngOnInit(): void {
    this.getDeviceUserConfigurations()
  }

  getDeviceUserConfigurations(){
    this.sub$.sink = this.routes.data.subscribe((data:{deviceUserConfig:DeviceUser})=>{
      if(!data.deviceUserConfig)return;
      this.deviceUserConfig = data.deviceUserConfig
    })
  }

  save(){
    this.isLoading$=true
    this.deviceService.UpdateDeviceUser(this.deviceUserConfig).subscribe((res)=>{
      this.toasterService.success(this.translationService.getValue('RESPONSE_MESSAGE.CONFIGURATION_UPDATE'))
      this.router.navigate(['/device/user',this.deviceUserConfig.deviceUUID]);
      this.isLoading$ =false

    })
  }
  onToggleChange(config: UserSystemFlag): void {
    config.value = config.value === 'TRUE' ? 'FALSE' : 'TRUE';
  }

  compareFn(option1: string, option2: string): boolean {
    return option1 === option2;
  }
}
