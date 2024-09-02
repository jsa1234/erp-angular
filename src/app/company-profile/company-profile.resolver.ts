import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { CompanyProfileService } from './company-profile.service';
import { ICompany } from '@core/domain-classes/company';
import { LoaderService } from '@shared/services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyProfileResolver implements Resolve<ICompany> {
  constructor(
    private companyProfileService: CompanyProfileService,
    private router: Router,
    private loader: LoaderService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICompany> | null {
    // this.loader.show();
    return this.companyProfileService.getCompany().pipe(
      take(1),
      mergeMap((companyProfile: ICompany) => {
        if (companyProfile) {
          // this.loader.hide();
          return of(companyProfile);
        } else {
          this.router.navigate(['/dashboard']);
          // this.loader.hide();

          return null;
        }
      })
    );
  }
}
