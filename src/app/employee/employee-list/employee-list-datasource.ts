import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, Subscription, of } from 'rxjs';
import { Employee } from '@core/domain-classes/employee';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { EmployeeService } from '../employee.service';
import { EmployeeResourceParameter } from '@core/domain-classes/employee-resourceparameter';
import { HttpResponse } from '@angular/common/http';

/**
 * Data source for the EmployeeList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EmployeeListDataSource implements DataSource<Employee> {

  private _employeeSubject$ = new BehaviorSubject<Employee[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject$.asObservable();
  sub$: Subscription;
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();
  
  constructor(private employeeService: EmployeeService) {
    this.sub$ = new Subscription();
  }
  private _count: number = 0;
  public get count(): number {
    return this._count;
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Employee[]> {
    return this._employeeSubject$.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this._employeeSubject$.complete();
    this.loadingSubject$.complete();
    this.sub$.unsubscribe();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData(data: EmployeeListItem[]): EmployeeListItem[] {
  //   if (this.paginator) {
  //     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //     return data.splice(startIndex, this.paginator.pageSize);
  //   } else {
  //     return data;
  //   }
  // }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getSortedData(data: EmployeeListItem[]): EmployeeListItem[] {
  //   if (!this.sort || !this.sort.active || this.sort.direction === '') {
  //     return data;
  //   }

  //   return data.sort((a, b) => {
  //     const isAsc = this.sort?.direction === 'asc';
  //     switch (this.sort?.active) {
  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'id': return compare(+a.id, +b.id, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
  loadData(employeeResource: EmployeeResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.employeeService.getEmployees(employeeResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Employee[]>) => {
        let paginationParam = new ResponseHeader();
        if (resp && resp.headers.get('X-Pagination')) {
          paginationParam = JSON.parse(
            resp.headers.get('X-Pagination')
          ) as ResponseHeader;
        }
        this._responseHeaderSubject$.next(paginationParam);
        const employee = [...resp.body];
        this._count = employee.length;
        this._employeeSubject$.next(employee);
      });
  }
}
