import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { FinancialYearInfo } from '@core/domain-classes/financial-year-info';
import { Observable, of } from 'rxjs';
import { SettingsService } from '../settings.service';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YearEndProcessResolver implements Resolve<FinancialYearInfo> {
  constructor(private cs:SettingsService, private router:Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FinancialYearInfo> | null{
    return this.cs.getCurrentFinancialYear().pipe(
      take(1),
      mergeMap(currentFinancialYear =>{
        if(currentFinancialYear){
          return of(currentFinancialYear)
        }
        else{
          this.router.navigate(['']);
          return null
        }
      })
    )
  }
}
