import { DataSource } from '@angular/cdk/table';
import { ProductPrice } from '@core/domain-classes/product';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ProductService } from '../../product.service';

export class ProductVarientDataSource implements DataSource<ProductPrice> {
  private _productVarientSubject$ = new BehaviorSubject<ProductPrice[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }

  constructor(private productVarientService: ProductService) {
  }

  connect(): Observable<ProductPrice[]> {
    this.sub$ = new Subscription();
    return this._productVarientSubject$.asObservable();
  }

  disconnect(): void {
    this._productVarientSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  loadData(id:string) {
    this.loadingSubject.next(true);
    this.sub$ = this.productVarientService.getProductVarients(id)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((resp: ProductPrice[]) => {
        const purchaseOrders = resp;
        this._productVarientSubject$.next(purchaseOrders);
          this._count = purchaseOrders.length;
      });
  }
}
