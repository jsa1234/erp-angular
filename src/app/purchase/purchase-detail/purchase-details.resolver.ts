import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { IPurchaseInvoice } from '@core/domain-classes/purchase-order/purchase-invoice';
import { LoaderService } from '@shared/services/loader.service';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { PurchaseService } from 'src/app/purchase/purchase.service';

@Injectable()
export class PurchaseDetailResolver implements Resolve<IPurchaseInvoice> {
  constructor(
    private purchaseService: PurchaseService,
    private router: Router,
    private loader: LoaderService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPurchaseInvoice> | null {
    const id = route.paramMap.get('id');
    if(id == 'add')return null;
    this.loader.show();
    return this.purchaseService.getPurchaseInvoiceById(id).pipe(
      take(1),
      mergeMap((purchaseInvoice) => {
        if (purchaseInvoice) {
          this.loader.hide();
          return of(purchaseInvoice);
        } else {
          this.router.navigate(['/purchase-order/list']);
          this.loader.hide();
          return null;
        }
      })
    );
  }
}
