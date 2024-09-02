import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { IVoucher } from '@core/domain-classes/voucher';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { ReceiptService } from '../receipt.service';
import { LoaderService } from '@shared/services/loader.service';


@Injectable()
export class ReceiptDetailResolverService implements Resolve<IVoucher> {
  constructor(private cs: ReceiptService, private router: Router,private loader: LoaderService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IVoucher> | null {
    const id = route.paramMap.get('id');
    this.loader.show();
    return this.cs.getSingleReceipt(id).pipe(
      take(1),
      mergeMap(receipt => {
        if (receipt) {
           this.loader.hide();
          return of(receipt);
        } else {
          this.router.navigate(['/receipt']);
           this.loader.hide();
          return null;
        }
      })
    );
  }
}
