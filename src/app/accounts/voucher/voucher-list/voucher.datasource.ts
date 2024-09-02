import { DataSource } from "@angular/cdk/collections";
import { HttpResponse } from "@angular/common/http";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { IVoucher, Voucher } from "@core/domain-classes/voucher";
import { VoucherResourceParameter } from "@core/domain-classes/voucher-resource-parameter";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { VoucherService } from "../voucher.service";

export class VoucherDataSource implements DataSource<IVoucher> {

    private _voucherSubject$ = new BehaviorSubject<IVoucher[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private _count: number = 0;
    sub$: Subscription;
    public get count(): number {
        return this._count;
      }

      public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

      constructor(private voucherService: VoucherService) {
    }

    connect(): Observable<IVoucher[]> {
        this.sub$ = new Subscription();
        return this._voucherSubject$.asObservable();
      }
    
      disconnect(): void {
        this._voucherSubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
      }

      loadData(voucherResource: VoucherResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.voucherService.getAllVouchers(voucherResource).pipe(
          tap(() => this.loadingSubject.next(false)),
          map((resp: HttpResponse<IVoucher[]>) => {
            const { headers } = resp;
            const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
            this._responseHeaderSubject$.next(paginationParam);
            const paymentVoucherLists = (resp.body || []).map(p => new Voucher(p));
            this._count = paymentVoucherLists.length;
            return paymentVoucherLists;
          }),
          catchError(() => of([]))
        ).subscribe((paymentVoucherLists:Voucher[]) => {
          this._voucherSubject$.next(paymentVoucherLists);
        });
      }
    
}