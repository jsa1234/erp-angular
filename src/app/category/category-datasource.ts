import {  DataSource } from "@angular/cdk/collections";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { BehaviorSubject, Observable, Subscription, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { CategoryService } from "./category.service";
import { ProductCategory } from "@core/domain-classes/product-category";
import { CategoryResourceParameter } from "@core/domain-classes/masters/category-resource-parameter";

export class CategoryDataSource implements DataSource<ProductCategory>{
    private _categorySubject$ = new BehaviorSubject<ProductCategory[]>([]);
    private _responseHeaderSubject$  = new BehaviorSubject<ResponseHeader>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    private _count = 0;
    sub$:Subscription

    public get count():number{
        return this._count
    }

    public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable()

    constructor(private categoryService:CategoryService) {}
    connect(): Observable<ProductCategory[]> {
        this.sub$ = new Subscription();
        return this._categorySubject$.asObservable();
    }
    disconnect(): void {
        this._categorySubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
    }

    loadData(categoryresource: CategoryResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.categoryService.getCategory(categoryresource)
          .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)))
          .subscribe((resp: HttpResponse<ProductCategory[]>) => {
            if (resp && resp.headers) {
              const paginationParam = JSON.parse(
                resp.headers.get('X-Pagination')
              ) as ResponseHeader;
              this._responseHeaderSubject$.next(paginationParam);
              const categories = [...resp.body];
              this._count = categories.length;
              this._categorySubject$.next(categories);
            }
          });
      }
    
}