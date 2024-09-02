import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError,  map, tap } from 'rxjs/operators';
import { PurchaseService } from 'src/app/purchase/purchase.service'; 
import { PurchaseReturnResourceParameter } from '@core/domain-classes/purchase-order/purchase-return-resource';  
import { IPurchaseReturn, PurchaseReturn } from '@core/domain-classes/purchase-order/purchase-return-invoice'; 
import { PurchaseReturnService } from '../purchase-return.service';

export class PurchaseReturnDataSource implements DataSource<PurchaseReturn> {
  private _purchaseReturnSubject$ = new BehaviorSubject<PurchaseReturn[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private purchaseReturnService: PurchaseReturnService) {
  }

  connect(): Observable<PurchaseReturn[]> {
    this.sub$ = new Subscription();
    return this._purchaseReturnSubject$.asObservable();
  }

  disconnect(): void {
    this._purchaseReturnSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  loadData(purchaseOrderResource: PurchaseReturnResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.purchaseReturnService.getAllPurchaseReturn(purchaseOrderResource).pipe(
      tap(() => this.loadingSubject.next(false)),
      map((resp: HttpResponse<IPurchaseReturn[]>) => {
        const { headers } = resp;
        const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
        this._responseHeaderSubject$.next(paginationParam);
        const purchaseReturnLists = (resp.body || []).map(p => new PurchaseReturn(p));
        this._count = purchaseReturnLists.length;
        return purchaseReturnLists;
      }),
      catchError(() => of([]))
    ).subscribe(purchaseReturnLists => {
      this._purchaseReturnSubject$.next(purchaseReturnLists);
    });
  }
}
