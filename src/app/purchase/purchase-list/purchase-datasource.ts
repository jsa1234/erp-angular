import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { PurchaseService } from '../purchase.service';
import { PurchaseInvoiceResourceParameter } from '@core/domain-classes/purchase-order/purchase-invoice-resource-parameter';
import { IPurchaseInvoice, PurchaseInvoice } from '@core/domain-classes/purchase-order/purchase-invoice';

export class PurchaseDataSource implements DataSource<PurchaseInvoice> {
  private _purchaseInvoiceSubject$ = new BehaviorSubject<PurchaseInvoice[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private purchaseService: PurchaseService) {
  }

  connect(): Observable<PurchaseInvoice[]> {
    this.sub$ = new Subscription();
    return this._purchaseInvoiceSubject$.asObservable();
  }

  disconnect(): void {
    this._purchaseInvoiceSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }


  loadData(purchaseOrderResource: PurchaseInvoiceResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.purchaseService.getAllPurchaseInvoice(purchaseOrderResource).pipe(
      tap(() => this.loadingSubject.next(false)),
      map((resp: HttpResponse<IPurchaseInvoice[]>) => {
        const { headers } = resp;
        const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
        this._responseHeaderSubject$.next(paginationParam);
        const purchaseInvoiceLists = (resp.body || []).map(p => new PurchaseInvoice(p));
        this._count = purchaseInvoiceLists.length;
        return purchaseInvoiceLists;
      }),
      catchError(() => of([]))
    ).subscribe((purchaseInvoiceLists:PurchaseInvoice[]) => {
      this._purchaseInvoiceSubject$.next(purchaseInvoiceLists);
    });
  }
  
}
