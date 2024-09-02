import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { DeviceUser } from '@core/domain-classes/device-user.interface';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { DeviceService } from '../../device.service';


@Injectable()
export class DeviceUserResolverService implements Resolve<DeviceUser> {
  constructor(private cs: DeviceService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<DeviceUser> | null {
    const id = route.paramMap.get('id');
    if (id === 'add') {
      return null;
    }
    return this.cs.GetSingleDeviceUsers(id).pipe(
      take(1),
      mergeMap(deviceUser => {
        if (deviceUser) {
          return of(deviceUser) as Observable<DeviceUser>;
        } else {
          this.router.navigate(['/device/user']);
          return null;
        }
      })
    );
  }
}
