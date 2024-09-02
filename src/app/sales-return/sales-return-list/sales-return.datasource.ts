import { DataSource } from "@angular/cdk/collections";
import { HttpResponse } from "@angular/common/http";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { SalesReturn } from "@core/domain-classes/sales-return";
import { SalesReturnResourceParameter } from "@core/domain-classes/sales-return-resource-parameter";
import { TranslationService } from "@core/services/translation.service";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { SalesService } from "src/app/sales/sales.service";

export class SalesReturnDataSource implements DataSource<SalesReturn>{
    private _salesReturnSubject$ = new BehaviorSubject<SalesReturn[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    private _count: number = 0;
    sub$: Subscription;

    public get count(): number {
        return this._count;
      }
      public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

      constructor(private salesReturnService: SalesService) {
    }

      connect(): Observable<SalesReturn[]> {
        this.sub$ = new Subscription();
        return this._salesReturnSubject$.asObservable();
      }
    
      disconnect(): void {
        this._salesReturnSubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
      }

      loadData(salesReturnResource: SalesReturnResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.salesReturnService.getAllSalesReturn(salesReturnResource)
          .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)))
          .subscribe((resp: HttpResponse<SalesReturn[]>) => {
            if (resp && resp.headers) {
              const paginationParam = JSON.parse(
                resp.headers.get('X-Pagination')
              ) as ResponseHeader;
              this._responseHeaderSubject$.next(paginationParam);
              const salesReturn = [...resp.body];
              let prs:SalesReturn[] = []
              for(let i=0; i<salesReturn.length;i++){
              let pr = new SalesReturn(salesReturn[i])
                prs.push(pr)
              }
              this._count = salesReturn.length;
              this._salesReturnSubject$.next(prs);
            }
          });
      }
}