import { DataSource } from '@angular/cdk/collections';

import { catchError, finalize} from 'rxjs/operators';
import { Observable,  BehaviorSubject, Subscription, of } from 'rxjs';
import { Device } from '@core/domain-classes/device';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { DeviceService } from '../device.service';
import { DeviceResourceParameter } from '@core/domain-classes/device-resource-parameter';
import { HttpResponse } from '@angular/common/http';


export class DeviceListDataSource implements DataSource<Device> {
  private _deviceSubjec$ = new BehaviorSubject<Device[]>([])
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null)
  private _loadingSubject$ = new BehaviorSubject<boolean>(false)

  public loading$ = this._loadingSubject$.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }

  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor( private deviceService:DeviceService) {
   
  }

  connect(): Observable<Device[]> {
    this.sub$ = new Subscription();
    return this._deviceSubjec$.asObservable();
  }

  disconnect(): void {
    this._deviceSubjec$.complete();
    this._loadingSubject$.complete();
    this.sub$.unsubscribe();
  }


  loadData(deviceResource: DeviceResourceParameter) {
    this._loadingSubject$.next(true);
    this.sub$ = this.deviceService.GetDevice(deviceResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this._loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Device[]>) => {
        if (resp && resp.headers) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const devices = [...resp.body];
          let ds:Device[] = []
          for(let i=0; i<devices.length;i++){
          let a = new Device(devices[i])
          ds.push(a)
          }
          this._count = devices.length;
          this._deviceSubjec$.next(ds);
        }
      });
  }
  
}
