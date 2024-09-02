import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { LoaderService } from '@shared/services/loader.service';
import { Observable, of } from 'rxjs';
import { PosPrinterService } from './pos-printer.service';
import { mergeMap, take } from 'rxjs/operators';
import { POSPrinter } from '@core/domain-classes/pos-printer.interface';

@Injectable({
  providedIn: 'root'
})
export class PosPrinterResolver implements Resolve<POSPrinter> {
  constructor(private loader:LoaderService,private vs:PosPrinterService, private router:Router) {
    
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<POSPrinter> {
    this.loader.show()
    const id = route.paramMap.get('id');
    if (id == 'add') {
      this.loader.hide();
      return null;
    }

    return this.vs.getSinglePosPrinter(id).pipe(
      take(1),
      mergeMap(posPrinter => {
        if (posPrinter) {
          this.loader.hide();
          return of(posPrinter);
        } else {
          this.loader.hide();
          this.router.navigate(['/pos-printer']);
          return null;
        }
      })
    );
  }
  }
