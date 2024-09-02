import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { IStockTransfer } from '@core/domain-classes/stock-transfe.interface';
import { LoaderService } from '@shared/services/loader.service';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { InventoryService } from '../../inventory.service';

@Injectable({
  providedIn: 'root'
})
export class StockTransferResolver implements Resolve<IStockTransfer> {
  constructor(
    private stockTransferService: InventoryService,
    private router: Router,
    private loader: LoaderService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStockTransfer> | null {
    const id = route.paramMap.get('id');
    if (id === 'add') {
      return null;
    }
    this.loader.show();
    return this.stockTransferService.getSingleStockTransfer(id).pipe(
      take(1),
      mergeMap((stockTransfer) => {
        if (stockTransfer) {
          this.loader.hide();
          return of(stockTransfer);
        } else {
          this.router.navigate(['/inventory/stock-transfer']);
          this.loader.hide();
          return null;
        }
      })
    );
  }
}
