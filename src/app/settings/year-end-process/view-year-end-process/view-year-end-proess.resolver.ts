import {Injectable} from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { SettingsService } from '../../settings.service';
import { Observable, of } from 'rxjs';
import { FinancialReport } from '@core/domain-classes/financial-report';
import { mergeMap, take } from 'rxjs/operators';
@Injectable({
providedIn:'root'
})
export class ViewYearEndProcessResolver implements Resolve<FinancialReport>{
    /**
     *
     */
    constructor(private cs:SettingsService,private router:Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FinancialReport> | null{
       const financialYearUuid = route.paramMap.get('financialYearUUID')
       const deviceUuid = route.paramMap.get('deviceUUID')
        return this.cs.getFinancialYearClosingData(deviceUuid,financialYearUuid).pipe(
          take(1),
          mergeMap(financialReport =>{
            if(financialReport){
              return of(financialReport)
            }
            else{
              this.router.navigate(['']);
              return null
            }
          })
        )
      }
}