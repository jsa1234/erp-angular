import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { IProduct } from '@core/domain-classes/product';


@Injectable()
export class ProductResolverService implements Resolve<IProduct> {
  constructor(private cs: ProductService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProduct> | null {
    const id = route.paramMap.get('id');
    if (id === 'add') {
      return null;
    }
    return this.cs.getSingleProduct(id).pipe(
      take(1),
      mergeMap(product => {
        if (product) {
          return of(product);
        } else {
          this.router.navigate(['/product']);
          return null;
        }
      })
    );
  }
}
