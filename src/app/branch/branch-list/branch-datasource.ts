import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { IBranch } from '@core/domain-classes/branch';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { BranchService } from '../branch.service';
import { BranchResourceParameter } from '@core/domain-classes/branch-resource-parameter';

export class BranchDataSource implements DataSource<IBranch> {
  private _branchSubject$ = new BehaviorSubject<IBranch[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private branchService: BranchService) {
  }

  connect(): Observable<IBranch[]> {
    this.sub$ = new Subscription();
    return this._branchSubject$.asObservable();
  }

  disconnect(): void {
    this._branchSubject$.complete();
    this.loadingSubject.complete();
    this.sub$.unsubscribe();
  }

  loadData(branchResource: BranchResourceParameter) {
    this.loadingSubject.next(true);
    this.sub$ = this.branchService.getAllBranches(branchResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false)))
      .subscribe((resp: HttpResponse<IBranch[]>) => {
        if (resp && resp.headers) {
          const paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
          this._responseHeaderSubject$.next(paginationParam);
          const branches = [...resp.body];
          this._count = branches.length;
          this._branchSubject$.next(branches);
        }
      });
  }
}
