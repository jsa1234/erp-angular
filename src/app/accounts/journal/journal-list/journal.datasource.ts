import { DataSource } from "@angular/cdk/collections";
import { HttpResponse } from "@angular/common/http";
import { IJournal, Journal } from "@core/domain-classes/journal";
import { JournalResourceParameter } from "@core/domain-classes/journal-resource-parameter";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { JournalService } from "../journal.service";

export class JournalDataSource implements DataSource<Journal> {

    private _journalSubject$ = new BehaviorSubject<Journal[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private _count: number = 0;
    sub$: Subscription;
    public get count(): number {
        return this._count;
      }

      public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

      constructor(private journalService: JournalService) {
    }

    connect(): Observable<Journal[]> {
        this.sub$ = new Subscription();
        return this._journalSubject$.asObservable();
      }
    
      disconnect(): void {
        this._journalSubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
      }
     
      loadData(journalResource: JournalResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.journalService.getAllJournals(journalResource).pipe(
          tap(() => this.loadingSubject.next(false)),
          map((resp: HttpResponse<IJournal[]>) => {
            const { headers } = resp;
            const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
            this._responseHeaderSubject$.next(paginationParam);
            const journalLists = (resp.body || []).map(p => new Journal(p));
            this._count = journalLists.length;
            return journalLists;
          }),
          catchError(() => of([]))
        ).subscribe((journalLists:Journal[]) => {
          this._journalSubject$.next(journalLists);
        });
      }
    
}


