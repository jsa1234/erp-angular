import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { IDevice } from '@core/domain-classes/device';
import { LoaderService } from '@shared/services/loader.service';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { DeviceService } from '../device.service';

@Injectable()
export class DeviceDetailResolver implements Resolve<IDevice> {
  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private loader: LoaderService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IDevice> | null {
    const id = route.paramMap.get('id');
    this.loader.show();
    return this.deviceService.GetSingleDevice(id).pipe(
      take(1),
      mergeMap((device) => {
        if (device) {
          this.loader.hide();
          return of(device);
        } else {
          this.router.navigate(['/device']);
          this.loader.hide();
          return null;
        }
      })
    );
  }
}
