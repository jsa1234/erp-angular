import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Supplier } from '@core/domain-classes/supplier';
import { SupplierService } from '../supplier.service';
import { SupplierResourceParameter } from '@core/domain-classes/supplier-resource-parameter';
import { SupplierAccountResourceParameter } from '@core/domain-classes/supplier-account-resourceparameter';
import { ISupplierAccount } from '@core/domain-classes/supplierAccount';

export class SupplierDataSource implements DataSource<ISupplierAccount> {
  private _entities$ = new BehaviorSubject<ISupplierAccount[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject$.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private supplierService: SupplierService) {
    this.sub$ = new Subscription();
  }

  connect(): Observable<ISupplierAccount[]> {
    return this._entities$.asObservable();
  }

  disconnect(): void {
    this._entities$.complete();
    this.loadingSubject$.complete();
    this.sub$.unsubscribe();
  }

  loadData(chemicalResource: SupplierAccountResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.supplierService.getSupplierAccounts(chemicalResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<ISupplierAccount[]>) => {
        let paginationParam = new ResponseHeader();
        if (resp && resp.headers.get('X-Pagination')) {
          paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
        }
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
}
