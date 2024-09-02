import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { SaleOrderResourceParameter } from '@core/domain-classes/sale-order-resoource-parameter';
import { ISaleOrder } from '@core/domain-classes/sale-order.interface';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SaleOrderService } from '../sale-order.service';

export class SaleOrderDataSource implements DataSource<ISaleOrder> {
  private _saleOrderSubject$ = new BehaviorSubject<ISaleOrder[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private saleOrderService: SaleOrderService) {
  }

  connect(): Observable<ISaleOrder[]> {
    this.sub$ = new Subscription();
    return this._saleOrderSubject$.asObservable();
  }

  disconnect(): void {
    this._saleOrderSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }



  loadData(salesOrderResource: SaleOrderResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.saleOrderService.getAllSaleOrder(salesOrderResource).pipe(
      tap(() => this.loadingSubject.next(false)),
      map((resp: HttpResponse<ISaleOrder[]>) => {
        const { headers } = resp;
        const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
        this._responseHeaderSubject$.next(paginationParam);
        const saleOrderLists = (resp.body || []);
        this._count = saleOrderLists.length;
        return saleOrderLists;
      }),
      catchError(() => of([]))
    ).subscribe((saleOrderLists:ISaleOrder[]) => {
      this._saleOrderSubject$.next(saleOrderLists);
    });
  }
}
