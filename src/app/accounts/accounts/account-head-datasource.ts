import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { HttpResponse } from "@angular/common/http";
import { AccountHead } from "@core/domain-classes/account-head";
import { AccountHeadResourceParameter } from "@core/domain-classes/account-head-resource-parameter";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { AccountHeadService } from "./account-head.service";

export class AccountHeadDataSource implements DataSource<AccountHead> {
    private _accountHeadSubject$ = new BehaviorSubject<AccountHead[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private _count: number = 0;
    sub$: Subscription;
    public get count(): number {
        return this._count;
      }

      public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

      constructor(private accountHeadService: AccountHeadService) {
    }
  connect(): Observable<AccountHead[]> {
    this.sub$ = new Subscription();
    return this._accountHeadSubject$.asObservable();
  }

  disconnect(): void {
    this._accountHeadSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }


loadData(accounHeadResource: AccountHeadResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.accountHeadService.getAccountHead(accounHeadResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((resp: HttpResponse<AccountHead[]>) => {
        if (resp && resp.headers) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const accounHead = [...resp.body];
          this._count = accounHead.length;
          this._accountHeadSubject$.next(accounHead);
        }
      });
  }
}