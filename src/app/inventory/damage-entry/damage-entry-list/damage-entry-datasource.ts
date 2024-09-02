import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { DamageEntryService } from '../damage-entry.service';
import { DamageEntryResourceParameter } from '@core/domain-classes/damage-entry-resource-parameter';
import { IDamageEntry } from '@core/domain-classes/damage-entry.interface';

export class DamageEntryDataSource implements DataSource<IDamageEntry> {
  private _damageEntrySubject$ = new BehaviorSubject<IDamageEntry[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private _loadingSubject$ = new BehaviorSubject<boolean>(false);

  public loading$ = this._loadingSubject$.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private damageEntryService: DamageEntryService) {
  }

  connect(): Observable<IDamageEntry[]> {
    this.sub$ = new Subscription();
    return this._damageEntrySubject$.asObservable();
  }

  disconnect(): void {
    this._damageEntrySubject$.complete();
    this._loadingSubject$.complete();
    this.sub$.unsubscribe();
  }


  loadData(damageEntryResource: DamageEntryResourceParameter) {
    this._loadingSubject$.next(true);
    this.sub$ = this.damageEntryService.getAllDamageEntry(damageEntryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this._loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<IDamageEntry[]>) => {
        if (resp && resp.headers) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const damageList = [...resp.body];
          this._count = damageList.length;
          this._damageEntrySubject$.next(damageList);
        }
      });
  }
  
}
