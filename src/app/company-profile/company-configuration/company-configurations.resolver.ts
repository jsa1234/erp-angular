import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { SystemFlagConfiguration } from '@core/domain-classes/device-configuration.interface';
import { SecurityService } from '@core/security/security.service';
import { LoaderService } from '@shared/services/loader.service';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { CompanyProfileService } from '../company-profile.service';

@Injectable()
export class CompanyConfigurationResolver implements Resolve<SystemFlagConfiguration[]> {
  constructor(
    private ss: SecurityService,
    private companyService:CompanyProfileService,
    private router: Router,
    private loader: LoaderService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SystemFlagConfiguration[]> | null {
    const id = this.ss.getUserDetail().companyUUID;
    this.loader.show();
    return this.companyService.getCompanyConfigurations(id).pipe(
      take(1),
      mergeMap((companyConfig) => {
        if (companyConfig) {
          this.loader.hide();
          return of(companyConfig);
        } else {
          this.router.navigate(['']);
          this.loader.hide();
          return null;
        }
      })
    );
  }
}
