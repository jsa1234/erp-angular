import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
import { ICustomerAccount } from '@core/domain-classes/customer-account';
import { CustomerAccountResourceParameter } from '@core/domain-classes/customer-account-Resourceparameter';
export class CustomerDataSource implements DataSource<ICustomerAccount> {
  private _entities$ = new BehaviorSubject<ICustomerAccount[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject$.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private customerService: CustomerService) {
    this.sub$ = new Subscription();
  }

  connect(): Observable<ICustomerAccount[]> {
    return this._entities$.asObservable();
  }

  disconnect(): void {
    this._entities$.complete();
    this.loadingSubject$.complete();
    this.sub$.unsubscribe();
  }

  loadData(resource: CustomerAccountResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.customerService.getCustomerAccount(resource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<ICustomerAccount[]>) => {
        if (resp && resp.headers.get('X-Pagination')) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const entities = [...resp.body];
          this._count = entities.length;
          this._entities$.next(entities);
        } else {
          this._entities$.next([]);
        }
      });
  }
}
