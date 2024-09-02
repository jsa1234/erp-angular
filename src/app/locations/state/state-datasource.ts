import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { State } from '@core/domain-classes/state';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { StateService } from './state.service';
import { LocationsResourceParameter } from '@core/domain-classes/masters/locations-resource-parameter';

export class StateDataSource implements DataSource<State> {
  private _stateSubject$ = new BehaviorSubject<State[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private stateService: StateService) {
  }

  connect(): Observable<State[]> {
    this.sub$ = new Subscription();
    return this._stateSubject$.asObservable();
  }

  disconnect(): void {
    this._stateSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  loadData(stateResource: LocationsResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.stateService.getStates(stateResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((resp: HttpResponse<State[]>) => {
        if (resp && resp.headers) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const states = [...resp.body];
          this._count = states.length;
          this._stateSubject$.next(states);
        }
      });
  }
}
