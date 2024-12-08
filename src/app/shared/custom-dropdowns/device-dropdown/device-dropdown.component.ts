import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDevice } from '@core/domain-classes/device';
import { SecurityService } from '@core/security/security.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DeviceService } from 'src/app/device/device.service';

@Component({
  selector: 'app-device-dropdown',
  templateUrl: './device-dropdown.component.html',
  styleUrls: ['./device-dropdown.component.scss'],
})
export class DeviceDropdownComponent
  extends BaseComponent
  implements OnChanges, OnDestroy
{
  @Input() group: FormGroup;
  @Input() controlName: FormControl;
  @Input() branch: string;
  devices: IDevice[];
  all: IDevice;
  webDevice: IDevice;
  controleNameLabel: string;
  @Input() isAddAll:boolean = true
  @Input() isMandatory:boolean = false
  constructor(
    private deviceService: DeviceService,
    public translate: TranslationService,
    securityService:SecurityService
  ) {
    super();
    this.devices = [];
    this.all = {
      deviceUUID: '',
      nameEnglish: 'ALL',
      nameSecondLanguage: '',
    };
    this.webDevice = {
      deviceUUID: securityService.getUserDetail().deviceUUID,
      nameEnglish: 'Web Device',
      nameSecondLanguage: '',
    };
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['controlName']) {
      this.controleNameLabel = this.controlName.toString();
    }
    if (changes['branch']) {
      this.branch ? this.getDevicesByBranch() : this.getDevices();
    } else {
      this.getDevices();
    }
  }

  getDevices(): void {
    this.sub$.add(
      this.deviceService.deviceList$.subscribe((res: IDevice[]) => {
        this.devices = this.isAddAll?[this.all,this.webDevice,...res]:[...res];
      })
    );
  }
  getDevicesByBranch(): void {
    this.sub$.sink = this.deviceService
      .GetDevicesByBranch(this.branch)
      .subscribe((res: IDevice[]) => {
        this.devices =  this.isAddAll?[this.all,this.webDevice,...res] :[...res];
      });
  }
}
