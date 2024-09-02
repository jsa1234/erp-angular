import { DataSource } from "@angular/cdk/collections";
import { HttpResponse } from "@angular/common/http";
import { POSMerchantAccount } from "@core/domain-classes/pos-merchant-account.interface";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { PaymentMerchantService } from "../payment-merchant.service";
import { POSMerchantAccountResourceParameter } from "@core/domain-classes/pos-merchant-account-resource-parameter";

export class POSMerchantAccountDataSource implements DataSource<POSMerchantAccount> {

    private _posMerchantAccountSubject$ = new BehaviorSubject<POSMerchantAccount[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private _count: number = 0;
    sub$: Subscription;
    public get count(): number {
        return this._count;
      }

      public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

      constructor(private posMerchantAccountService: PaymentMerchantService) {
    }

    connect(): Observable<POSMerchantAccount[]> {
        this.sub$ = new Subscription();
        return this._posMerchantAccountSubject$.asObservable();
      }
    
      disconnect(): void {
        this._posMerchantAccountSubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
      }
     
      loadData(posMerchantAccountResource: POSMerchantAccountResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.posMerchantAccountService.getAllPosMerchantAccount(posMerchantAccountResource).pipe(
          tap(() => this.loadingSubject.next(false)),
          map((resp: HttpResponse<POSMerchantAccount[]>) => {
            const { headers } = resp;
            const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
            this._responseHeaderSubject$.next(paginationParam);
            const posMerchantAccountLists = resp.body || []
            this._count = posMerchantAccountLists.length;
            return posMerchantAccountLists;
          }),
          catchError(() => of([]))
        ).subscribe((posDeviceLists:POSMerchantAccount[]) => {
          this._posMerchantAccountSubject$.next(posDeviceLists);
        });
      }
    
}


