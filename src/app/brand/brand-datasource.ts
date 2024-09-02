import {  DataSource } from "@angular/cdk/collections";
import { Brand } from "@core/domain-classes/brand";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { BehaviorSubject, Observable, Subscription, of } from "rxjs";
import { BrandService } from "./brand.service";
import { BrandResourceParameter } from "@core/domain-classes/masters/brand-resource-parameter";
import { catchError, finalize } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";

export class BrandDataSource implements DataSource<Brand>{
    private _brandSubject$ = new BehaviorSubject<Brand[]>([]);
    private _responseHeaderSubject$  = new BehaviorSubject<ResponseHeader>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    private _count = 0;
    sub$:Subscription

    public get count():number{
        return this._count
    }

    public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable()

    constructor(private brandService:BrandService) {}
    connect(): Observable<Brand[]> {
        this.sub$ = new Subscription();
        return this._brandSubject$.asObservable();
    }
    disconnect(): void {
        this._brandSubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
    }

    loadData(brandResource: BrandResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.brandService.getBrands(brandResource)
          .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false)))
          .subscribe((resp: HttpResponse<Brand[]>) => {
            if (resp && resp.headers) {
              const paginationParam = JSON.parse(
                resp.headers.get('X-Pagination')
              ) as ResponseHeader;
              this._responseHeaderSubject$.next(paginationParam);
              const brands = [...resp.body];
              this._count = brands.length;
              this._brandSubject$.next(brands);
            }
          });
      }
    
}