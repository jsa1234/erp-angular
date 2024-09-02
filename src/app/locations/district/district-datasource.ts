import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { District } from '@core/domain-classes/district';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DistrictService } from './district.service';
import { LocationsResourceParameter } from '@core/domain-classes/masters/locations-resource-parameter';

export class DistrictDataSource implements DataSource<District> {
  private _districtSubject$ = new BehaviorSubject<District[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private districtService: DistrictService) {
  }

  connect(): Observable<District[]> {
    this.sub$ = new Subscription();
    return this._districtSubject$.asObservable();
  }

  disconnect(): void {
    this._districtSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  loadData(districtResource: LocationsResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.districtService.getDistricts(districtResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((resp: HttpResponse<District[]>) => {
        if (resp && resp.headers) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const districts = [...resp.body];
          this._count = districts.length;
          this._districtSubject$.next(districts);
        }
      });
  }
}
