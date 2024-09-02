import { DataSource } from "@angular/cdk/collections";
import { HttpResponse } from "@angular/common/http";
import { JournalResourceParameter } from "@core/domain-classes/journal-resource-parameter";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { POSDevice } from "@core/domain-classes/pos-device.interface";
import { PosDeviceService } from "../pos-device.service";
import { POSDeviceResourceParameter } from "@core/domain-classes/pos-device-resource-parameter";

export class POSDeviceDataSource implements DataSource<POSDevice> {

    private _posDeviceSubject$ = new BehaviorSubject<POSDevice[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private _count: number = 0;
    sub$: Subscription;
    public get count(): number {
        return this._count;
      }

      public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

      constructor(private posDeviceService: PosDeviceService) {
    }

    connect(): Observable<POSDevice[]> {
        this.sub$ = new Subscription();
        return this._posDeviceSubject$.asObservable();
      }
    
      disconnect(): void {
        this._posDeviceSubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
      }
     
      loadData(posDeviceResource: POSDeviceResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.posDeviceService.getPOSDeviceList(posDeviceResource).pipe(
          tap(() => this.loadingSubject.next(false)),
          map((resp: HttpResponse<POSDevice[]>) => {
            const { headers } = resp;
            const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
            this._responseHeaderSubject$.next(paginationParam);
            const posDeviceLists = resp.body || []
            this._count = posDeviceLists.length;
            return posDeviceLists;
          }),
          catchError(() => of([]))
        ).subscribe((posDeviceLists:POSDevice[]) => {
          this._posDeviceSubject$.next(posDeviceLists);
        });
      }
    
}


