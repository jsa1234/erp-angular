import { DataSource } from '@angular/cdk/table';
import { DeviceUser } from '@core/domain-classes/device-user.interface';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DeviceService } from '../../device.service';

export class DeviceUserDataSource implements DataSource<DeviceUser> {
  private _deviceUserSubject$ = new BehaviorSubject<DeviceUser[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }

  constructor(private deviceService: DeviceService) {
  }

  connect(): Observable<DeviceUser[]> {
    this.sub$ = new Subscription();
    return this._deviceUserSubject$.asObservable();
  }

  disconnect(): void {
    this._deviceUserSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  loadData(deviceUuid: string) {
    this.loadingSubject.next(true);
    this.sub$ = this.deviceService.GetAllDeviceUsers(deviceUuid)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((resp: DeviceUser[]) => {
        if (resp) {
          const deviceUserList = resp;
          this._count = deviceUserList.length;
          this._deviceUserSubject$.next(deviceUserList);
        }
      });
  }
}
