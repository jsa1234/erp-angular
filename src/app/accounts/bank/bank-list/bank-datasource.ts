import { DataSource } from "@angular/cdk/collections";
import { HttpResponse } from "@angular/common/http";
import { JournalResourceParameter } from "@core/domain-classes/journal-resource-parameter";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { BehaviorSubject, Observable, Subscription, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { BankService } from "../bank.service";
import { Bank } from "@core/domain-classes/bank.interface";

export class BankDataSource implements DataSource<Bank> {

    private _bankSubject$ = new BehaviorSubject<Bank[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private _count: number = 0;
    sub$: Subscription;
    public get count(): number {
        return this._count;
      }

      public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

      constructor(private bankService: BankService) {
    }

    connect(): Observable<Bank[]> {
        this.sub$ = new Subscription();
        return this._bankSubject$.asObservable();
      }
    
      disconnect(): void {
        this._bankSubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
      }
     
      loadData(bankResource: JournalResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.bankService.getAllBanks(bankResource).pipe(
          tap(() => this.loadingSubject.next(false)),
          map((resp: HttpResponse<Bank[]>) => {
            const { headers } = resp;
            const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
            this._responseHeaderSubject$.next(paginationParam);
            const bankLists = resp.body || [];
            this._count = bankLists.length;
            return bankLists;
          }),
          catchError(() => of([]))
        ).subscribe((bankLists:Bank[]) => {
          this._bankSubject$.next(bankLists);
        });
      }
    
}


