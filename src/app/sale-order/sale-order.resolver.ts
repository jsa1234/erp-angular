import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SaleOrderService } from './sale-order.service';
import { mergeMap, take } from 'rxjs/operators';
import { ISaleOrder } from '@core/domain-classes/sale-order.interface';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderResolver implements Resolve<ISaleOrder> {
  constructor(private saleOrderService:SaleOrderService, private router:Router) {
    
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISaleOrder> {
    const id = route.paramMap.get('id');
        return this.saleOrderService.getSingleSaleOrder(id).pipe(
            take(1),
            mergeMap(saleOrder => {
                if (saleOrder) {
                    return of(saleOrder);
                } else {
                    this.router.navigate(['/sales-order']);
                    return null;
                }
            })
        );
  }
}
