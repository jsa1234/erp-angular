import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { Country } from '@core/domain-classes/country';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CountryService } from './country.service';
import { LocationsResourceParameter } from '@core/domain-classes/masters/locations-resource-parameter';

export class CountryDataSource implements DataSource<Country> {
  private _countrySubject$ = new BehaviorSubject<Country[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private countryService: CountryService) {
  }

  connect(): Observable<Country[]> {
    this.sub$ = new Subscription();
    return this._countrySubject$.asObservable();
  }

  disconnect(): void {
    this._countrySubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  loadData(countryResource: LocationsResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.countryService.getCountries(countryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((resp: HttpResponse<Country[]>) => {
        if (resp && resp.headers) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const countries = [...resp.body];
          this._count = countries.length;
          this._countrySubject$.next(countries);
        }
      });
  }
}
