import {  DataSource } from "@angular/cdk/collections";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { ISyncLogs, SyncLogs } from "@core/domain-classes/sync-logs";
import { BehaviorSubject, Observable, Subscription, of } from "rxjs";
import { DeviceService } from "../../device.service";
import { SyncResourceParameter } from "@core/domain-classes/sync-resource-parameter";
import { catchError, map, tap } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";

export class SyncLogsDataSource implements DataSource<SyncLogs>{
    private _syncLogsSubject$ = new BehaviorSubject<SyncLogs[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null)
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private _count = 0;
    sub$:Subscription

    public get count():number{
        return this._count
    }

    public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable()

    constructor(private syncLogsService:DeviceService) {}

     connect(): Observable<SyncLogs[]> {
        this.sub$ = new Subscription();
        return this._syncLogsSubject$.asObservable();
    }
    disconnect(): void {
        this._syncLogsSubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
    }

    loadData(syncLogsResource: SyncResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.syncLogsService.GetSyncLogs(syncLogsResource).pipe(
          tap(() => this.loadingSubject.next(false)),
          map((resp: HttpResponse<ISyncLogs[]>) => {
            const { headers } = resp;
            const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
            this._responseHeaderSubject$.next(paginationParam);
            const syncLogsLists = (resp.body || []).map(p => new SyncLogs(p));
            this._count = syncLogsLists.length;
            return syncLogsLists;
          }),
          catchError(() => of([]))
        ).subscribe((syncLogsLists:SyncLogs[]) => {
          this._syncLogsSubject$.next(syncLogsLists);
        });
      }
}