import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ProductResourceParameter } from '@core/domain-classes/product-resource-parameter';
import { Product } from '@core/domain-classes/product';

export class ProductDataSource implements DataSource<Product> {
  private _productSubject$ = new BehaviorSubject<Product[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private productService: ProductService) {
  }

  connect(): Observable<Product[]> {
    this.sub$ = new Subscription();
    return this._productSubject$.asObservable();
  }

  disconnect(): void {
    this._productSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  loadData(productResource: ProductResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.productService.getProducts(productResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((resp: HttpResponse<Product[]>) => {
        if (resp && resp.headers) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const products = [...resp.body];
          let prs:Product[] = []
          for(let i=0; i<products.length;i++){
          let pr = new Product(products[i])
            prs.push(pr)
          }
          this._count = products.length;
          this._productSubject$.next(prs);
        }
      });
  }
}
