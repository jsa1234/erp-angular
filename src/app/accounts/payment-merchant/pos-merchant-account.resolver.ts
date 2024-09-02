import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { POSMerchantAccount } from '@core/domain-classes/pos-merchant-account.interface';
import { CommonError } from '@core/error-handler/common-error';
import { LoaderService } from '@shared/services/loader.service';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { PaymentMerchantService } from './payment-merchant.service';

@Injectable({
  providedIn: 'root'
})
export class PosMerchantAccountResolver implements Resolve<POSMerchantAccount | CommonError> {
  constructor(private vs: PaymentMerchantService, private router: Router, private loader:LoaderService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<POSMerchantAccount | CommonError>  {
    const id = route.paramMap.get('id');
    if (id == 'add') {
      this.loader.hide();
      return null;
    }

    return this.vs.getSinglePosMerchantAccount(id).pipe(
      take(1),
      mergeMap(posMerchantAccount => {
        if (posMerchantAccount) {
          this.loader.hide();
          return of(posMerchantAccount);
        } else {
          this.loader.hide();
          this.router.navigate(['/payment-merchant']);
          return null;
        }
      })
    );
  }
}
