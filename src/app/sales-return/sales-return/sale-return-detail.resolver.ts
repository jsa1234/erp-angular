import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { SalesReturn } from "@core/domain-classes/sales-return";
import { Observable, of } from "rxjs";
import { mergeMap, take } from "rxjs/operators";
import { SalesService } from "src/app/sales/sales.service";

@Injectable()
export class SalesReturnResolverService implements Resolve<SalesReturn> {
    constructor(private salesReturnService: SalesService, private router: Router) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<SalesReturn> | null {
        const id = route.paramMap.get('id');
        return this.salesReturnService.getSalesReturnById(id).pipe(
            take(1),
            mergeMap(saleReturn => {
                if (saleReturn) {
                    return of(saleReturn);
                } else {
                    this.router.navigate(['/sales-return/list']);
                    return null;
                }
            })
        );
    }
}
