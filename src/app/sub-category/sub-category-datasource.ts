import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ProductSubcategory } from '@core/domain-classes/product-subcategory';
import { SubCategoryService } from './sub-category.service';
import { SubcategoryResourceParameter } from '@core/domain-classes/masters/subcategory-resource-parameter';

export class SubCategoryDataSource implements DataSource<ProductSubcategory> {
  private _subCategorySubject$ = new BehaviorSubject<ProductSubcategory[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private subCategoryService: SubCategoryService) {
  }

  connect(): Observable<ProductSubcategory[]> {
    this.sub$ = new Subscription();
    return this._subCategorySubject$.asObservable();
  }

  disconnect(): void {
    this._subCategorySubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  loadData(SubcategoryResource: SubcategoryResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.subCategoryService.getProductSubcategory(SubcategoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((resp: HttpResponse<ProductSubcategory[]>) => {
        if (resp && resp.headers) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const subCategories = [...resp.body];
          this._count = subCategories.length;
          this._subCategorySubject$.next(subCategories);
        }
      });
  }
}
