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
import { VoucherService } from '../voucher.service';
import { LoaderService } from '@shared/services/loader.service';



@Injectable()
export class VoucherDetailResolverService implements Resolve<IVoucher> {
  constructor(private cs: VoucherService, private router: Router,    private loader: LoaderService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IVoucher> | null {
    const id = route.paramMap.get('id');
    this.loader.show();
    return this.cs.getSingleVoucher(id).pipe(
      take(1),
      mergeMap(voucher => {
        if (voucher) {
          this.loader.hide();
          return of(voucher);
        } else {
          this.router.navigate(['/voucher']);
          this.loader.hide();
          return null;
        }
      })
    );
  }
}
