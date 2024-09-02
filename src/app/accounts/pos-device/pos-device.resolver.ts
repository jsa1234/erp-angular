import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { PosDeviceService } from './pos-device.service';
import { LoaderService } from '@shared/services/loader.service';
import { mergeMap, take } from 'rxjs/operators';
import { POSDevice } from '@core/domain-classes/pos-device.interface';
import { CommonError } from '@core/error-handler/common-error';

@Injectable({
  providedIn: 'root'
})
export class PosDeviceResolver implements Resolve<POSDevice | CommonError> {
  constructor(private vs: PosDeviceService, private router: Router, private loader:LoaderService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<POSDevice | CommonError>  {
    this.loader.show()
    const id = route.paramMap.get('id');
    if (id == 'add') {
      this.loader.hide();
      return null;
    }

    return this.vs.getSinglePosDevice(id).pipe(
      take(1),
      mergeMap(posDevice => {
        if (posDevice) {
          this.loader.hide();
          return of(posDevice);
        } else {
          this.loader.hide();
          this.router.navigate(['/pos-device']);
          return null;
        }
      })
    );
  }
}
