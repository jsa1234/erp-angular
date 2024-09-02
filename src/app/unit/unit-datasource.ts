import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Unit } from '@core/domain-classes/unit';
import { UnitService } from './unit.service';
import { UnitResourceParameter } from '@core/domain-classes/masters/unit-resource-parameter';

export class UnitDataSource implements DataSource<Unit> {
  private _unitSubject$ = new BehaviorSubject<Unit[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private unitService: UnitService) {
  }

  connect(): Observable<Unit[]> {
    this.sub$ = new Subscription();
    return this._unitSubject$.asObservable();
  }

  disconnect(): void {
    this._unitSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  loadData(unitResource: UnitResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.unitService.getUnits(unitResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((resp: HttpResponse<Unit[]>) => {
        if (resp && resp.headers) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const units = [...resp.body];
          this._count = units.length;
          this._unitSubject$.next(units);
        }
      });
  }
}
