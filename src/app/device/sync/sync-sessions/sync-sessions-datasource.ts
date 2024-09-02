import {  DataSource } from "@angular/cdk/collections";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { BehaviorSubject, Observable, Subscription, of } from "rxjs";
import { DeviceService } from "../../device.service";
import { catchError, map, tap } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { ISyncSessions, SyncSessions } from "@core/domain-classes/sync-sessions";
import { SyncResourceParameter } from "@core/domain-classes/sync-resource-parameter";

export class SyncSessionsDataSource implements DataSource<SyncSessions>{
    private _syncSessionsSubject$ = new BehaviorSubject<SyncSessions[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null)
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private _count = 0;
    sub$:Subscription

    public get count():number{
        return this._count
    }

    public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable()

    constructor(private syncSessionsService:DeviceService) {}

     connect(): Observable<SyncSessions[]> {
        this.sub$ = new Subscription();
        return this._syncSessionsSubject$.asObservable();
    }
    disconnect(): void {
        this._syncSessionsSubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
    }

    loadData(syncSessionsResource: SyncResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.syncSessionsService.GetSyncSessions(syncSessionsResource).pipe(
          tap(() => this.loadingSubject.next(false)),
          map((resp: HttpResponse<ISyncSessions[]>) => {
            const { headers } = resp;
            const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
            this._responseHeaderSubject$.next(paginationParam);
            const syncSessionsLists = (resp.body || []).map(p => new SyncSessions(p));
            this._count = syncSessionsLists.length;
            return syncSessionsLists;
          }),
          catchError(() => of([]))
        ).subscribe((syncSessionsLists:SyncSessions[]) => {
          this._syncSessionsSubject$.next(syncSessionsLists);
        });
      }
}