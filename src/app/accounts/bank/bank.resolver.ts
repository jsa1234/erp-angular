import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Bank } from '@core/domain-classes/bank.interface';
import { Observable, forkJoin, of } from 'rxjs';
import { BankService } from './bank.service';
import { take, mergeMap } from 'rxjs/operators';
import { CommonError } from '@core/error-handler/common-error';
import { BankTypes } from '@core/domain-classes/bank-types.interface';
import { LoaderService } from '@shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class BankResolver implements Resolve<[Bank, BankTypes[]] | CommonError> {
  constructor(private vs: BankService, private router: Router, private loader:LoaderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Bank, BankTypes[]] | CommonError> | null {
    this.loader.show()
    const id = route.paramMap.get('id');
    if (id == 'add') {
      this.loader.hide();
      return null;
    }

    const bank$ = this.vs.getSingleBank(id).pipe(take(1));
    const bankTypes$ = this.vs.getAllBankTypes().pipe(take(1));

    return forkJoin([bank$, bankTypes$]).pipe(
      mergeMap(([bank, bankTypes]) => {
        if (bank && bankTypes) {
          this.loader.hide();
          return of([bank, bankTypes] as [Bank, BankTypes[]]);
        } else {
          this.router.navigate(['/bank']);
          this.loader.hide();
          return of(null); 
        }
      })
    );
  }
}
