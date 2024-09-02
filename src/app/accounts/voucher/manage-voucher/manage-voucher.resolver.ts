import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { IVoucher } from '@core/domain-classes/voucher';
import { Observable, of } from 'rxjs';
import { VoucherService } from '../voucher.service';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageVoucherResolver implements Resolve<IVoucher> {
  constructor(private vs: VoucherService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVoucher> | null {
    const id =  route.paramMap.get('id');
    if(id == 'add'){
    return null;
    }

    return this.vs.getSingleVoucher(id).pipe(
      take(1),
      mergeMap(voucher => {
        if (voucher) {
          return of(voucher);
        } else {
          this.router.navigate(['/paymentVoucher']);
          return null;
        }
      })
    );
  }
}
