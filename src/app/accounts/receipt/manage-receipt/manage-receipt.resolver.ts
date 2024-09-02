import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { IVoucher } from '@core/domain-classes/voucher';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ReceiptService } from '../receipt.service';

@Injectable({
  providedIn: 'root'
})
export class ManageReceiptResolver implements Resolve<IVoucher> {
  constructor(private vs: ReceiptService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVoucher> | null {
    const id =  route.paramMap.get('id');
    if(id == 'add'){
    return null;
    }

    return this.vs.getSingleReceipt(id).pipe(
      take(1),
      mergeMap(receipt => {
        if (receipt) {
          return of(receipt);
        } else {
          this.router.navigate(['/receiptVoucher']);
          return null;
        }
      })
    );
  }
}
