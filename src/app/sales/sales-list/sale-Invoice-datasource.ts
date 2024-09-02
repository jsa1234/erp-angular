import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError,  map, tap } from 'rxjs/operators';
import { SalesService } from '../sales.service';
import { SalesInvoiceResourceParameter } from '@core/domain-classes/sales-resourceParameter';
import { ISalesInvoice, SalesInvoice } from '@core/domain-classes/sales-invoice';

export class SalesInvoiceDataSource implements DataSource<SalesInvoice> {
  private _saleOrderSubject$ = new BehaviorSubject<SalesInvoice[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private saleOrderService: SalesService) {
  }

  connect(): Observable<SalesInvoice[]> {
    this.sub$ = new Subscription();
    return this._saleOrderSubject$.asObservable();
  }

  disconnect(): void {
    this._saleOrderSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  // loadData(salesOrderResource: SalesInvoiceResourceParameter) {
  //   this.loadingSubject.next(true);
  //   this.sub$ = this.saleOrderService.getAllSalesInvoice(salesOrderResource)
  //     .pipe(
  //       catchError(() => of([])),
  //       finalize(() => this.loadingSubject.next(false)))
  //     .subscribe((resp: HttpResponse<ISalesInvoice[]>) => {
  //       if (resp && resp.headers) {
  //         const paginationParam = JSON.parse(
  //           resp.headers.get('X-Pagination')
  //         ) as ResponseHeader;
  //         this._responseHeaderSubject$.next(paginationParam);
  //         const salesInvoice = [...resp.body];
  //         let prs:SalesInvoice[] = []
  //         for(let i=0; i<salesInvoice.length;i++){
  //         let pr = new SalesInvoice(salesInvoice[i])
  //           prs.push(pr)
  //         }
  //         this._count = salesInvoice.length;
  //         this._saleOrderSubject$.next(prs);
  //       }
  //     });
  // }


  loadData(salesOrderResource: SalesInvoiceResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.saleOrderService.getAllSalesInvoice(salesOrderResource).pipe(
      tap(() => this.loadingSubject.next(false)),
      map((resp: HttpResponse<ISalesInvoice[]>) => {
        const { headers } = resp;
        const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
        this._responseHeaderSubject$.next(paginationParam);
        const salesInvoiceLists = (resp.body || []).map(p => new SalesInvoice(p));
        this._count = salesInvoiceLists.length;
        return salesInvoiceLists;
      }),
      catchError(() => of([]))
    ).subscribe((salesInvoiceLists:SalesInvoice[]) => {
      this._saleOrderSubject$.next(salesInvoiceLists);
    });
  }
}
