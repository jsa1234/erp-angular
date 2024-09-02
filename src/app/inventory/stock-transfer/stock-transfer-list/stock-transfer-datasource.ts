import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { IPurchaseInvoice, PurchaseInvoice } from '@core/domain-classes/purchase-order/purchase-invoice';
import { PurchaseInvoiceResourceParameter } from '@core/domain-classes/purchase-order/purchase-invoice-resource-parameter';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { IStockTransfer } from '@core/domain-classes/stock-transfe.interface';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { InventoryService } from '../../inventory.service';
import { StockTransferResourceParameter } from '@core/domain-classes/stock-trasfer-resource-parameter';

export class StockTransferDataSource implements DataSource<IStockTransfer> {
  private _stockTransferSubject$ = new BehaviorSubject<IStockTransfer[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private stockTransferService: InventoryService) {
  }

  connect(): Observable<IStockTransfer[]> {
    this.sub$ = new Subscription();
    return this._stockTransferSubject$.asObservable();
  }

  disconnect(): void {
    this._stockTransferSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }


  loadData(stockTransferResource: StockTransferResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.stockTransferService.getAllStockTransfers(stockTransferResource).pipe(
      tap(() => this.loadingSubject.next(false)),
      map((resp: HttpResponse<IStockTransfer[]>) => {
        const { headers } = resp;
        const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
        this._responseHeaderSubject$.next(paginationParam);
        const stockTransferList = resp.body || [];
        this._count = stockTransferList.length;
        return stockTransferList;
      }),
      catchError(() => of([]))
    ).subscribe((stockTransferList:IStockTransfer[]) => {
      this._stockTransferSubject$.next(stockTransferList);
    });
  }
  
}
