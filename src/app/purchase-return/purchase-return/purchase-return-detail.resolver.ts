import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { IPurchaseReturn, PurchaseReturn } from "@core/domain-classes/purchase-order/purchase-return-invoice";
import { LoaderService } from "@shared/services/loader.service";
import { Observable, of } from "rxjs";
import { mergeMap,take } from "rxjs/operators";
import { PurchaseReturnService } from "../purchase-return.service";

@Injectable()
export class PurchaseReturnResolverService implements Resolve<IPurchaseReturn>{
    
    constructor(private pr:PurchaseReturnService,private router:Router, private loader:LoaderService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPurchaseReturn> | null {
        const id=route.paramMap.get('id');
        if(id == 'add') return null;
        this.loader.show();
        return this.pr.getPurchaseReturnById(id).pipe(
            take(1),
            mergeMap(purchaseReturn=>{
                if(purchaseReturn){
                    this.loader.hide();
                    return of(purchaseReturn);
                }else {
                    this.router.navigate(['/purchase-return/list']);
                    this.loader.hide();
                    return null;

                }
            })
        )
    }
}