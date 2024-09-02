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
import { BranchService } from '../branch.service';
import { CommonError } from '@core/error-handler/common-error';

@Injectable()
export class BranchConfigurationResolver implements Resolve<SystemFlagConfiguration[]> {
  constructor(
    private branchService: BranchService,
    private router: Router,
    private loader: LoaderService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SystemFlagConfiguration[]> | null {
    const id = route.paramMap.get('id');
    this.loader.show();
    return this.branchService.getBranchConfigurations(id).pipe(
      take(1),
      mergeMap((branchConfig: SystemFlagConfiguration[] | CommonError) => {
        if (Array.isArray(branchConfig)) {
          this.loader.hide();
          return of(branchConfig);
        } else {
          this.router.navigate(['/branch']);
          this.loader.hide();
          return of(null); // Explicitly returning an observable of null
        }
      },)
    );
  }
}
