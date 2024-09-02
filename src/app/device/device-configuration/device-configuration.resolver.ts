import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SystemFlagConfiguration } from '@core/domain-classes/device-configuration.interface';
import { LoaderService } from '@shared/services/loader.service';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { DeviceService } from '../device.service';

@Injectable()
export class DeviceConfigurationResolver implements Resolve<SystemFlagConfiguration[]> {
  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private loader: LoaderService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SystemFlagConfiguration[]> | null {
    const id = route.paramMap.get('id');
    this.loader.show();
    return this.deviceService.GetDeviceSystemFlags(id).pipe(
      take(1),
      mergeMap((deviceConfig) => {
        if (deviceConfig) {
          this.loader.hide();
          return of(deviceConfig);
        } else {
          this.router.navigate(['/device']);
          this.loader.hide();
          return null;
        }
      })
    );
  }
}
