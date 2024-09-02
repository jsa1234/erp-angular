import { Injectable } from '@angular/core';
import {
    Resolve,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { SalesService } from '../sales.service';
import { ISalesInvoice } from '@core/domain-classes/sales-invoice';



@Injectable()
export class SalesResolverService implements Resolve<ISalesInvoice> {
    constructor(private salesOrderService: SalesService, private router: Router) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ISalesInvoice> | null {
        const id = route.paramMap.get('id');
        return this.salesOrderService.getSalesInvoiceById(id).pipe(
            take(1),
            mergeMap(saleInvoice => {
                if (saleInvoice) {
                    return of(saleInvoice);
                } else {
                    this.router.navigate(['/sales-invoice']);
                    return null;
                }
            })
        );
    }
}
