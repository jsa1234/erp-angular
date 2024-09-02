import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../user.service';
import { LoaderService } from '@shared/services/loader.service';
import { SystemFlagConfiguration } from '@core/domain-classes/device-configuration.interface';
import { mergeMap, take } from 'rxjs/operators';
import { CommonError } from '@core/error-handler/common-error';

@Injectable({
  providedIn: 'root'
})
export class UserConfigurationResolver implements Resolve<SystemFlagConfiguration[]> {
  constructor(
    private userService: UserService,
    private router: Router,
    private loader: LoaderService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SystemFlagConfiguration[]> | null {
    const id = route.paramMap.get('id');
    this.loader.show();
    return this.userService.getUserConfigurations(id).pipe(
      take(1),
      mergeMap((userConfig: SystemFlagConfiguration[] | CommonError) => {
        if (Array.isArray(userConfig)) {
          this.loader.hide();
          return of(userConfig);
        } else {
          this.router.navigate(['/users']);
          this.loader.hide();
          return of(null); // Explicitly returning an observable of null
        }
      },)
    );
  }
}
