import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Country } from '@core/domain-classes/country';
import { Employee } from '@core/domain-classes/employee';
import { EmployeeResourceParameter } from '@core/domain-classes/employee-resourceparameter';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { CommonService } from '@core/services/common.service';
import { CountryService } from '@core/services/country.service';
import { TranslationService } from '@core/services/translation.service';
import { QueryParams } from '@ngrx/data';
import { ToastrService } from 'ngx-toastr';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { EmployeeService } from '../employee.service';
import { EmployeeListDataSource } from './employee-list-datasource';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent
  extends BaseComponent
  implements AfterViewInit
{
  pageOptions: number[] = environment.pageSizeOptions;
  displayedColumns: string[] = [
    'action',
    'nameEnglish',
    // 'nameSecondLanguage',
    'email',
    'mobile',
    'country',
    'state',
    'district',
  ];
  searchHeader: string[] = [
    'action-search',
    'nameEnglish-search',
    // 'nameSecondLanguage-search',
    'email-search',
    'mobNo-search',
    'country-search',
    'state-search',
    'district-search',
  ];
  columnsToDisplay: string[] = ['footer'];

  dataSource: EmployeeListDataSource;
  employeeResources: EmployeeResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  _nameEnglishFilter: string;
  _nameArabicFilter: string;
  _emailFilter: string;
  _mobileFilter: string;

  public get NameEnglishFilter(): string {
    return this._nameEnglishFilter;
  }

  public get NameArabicFilter(): string {
    return this._nameArabicFilter;
  }
  public get EmailFilter(): string {
    return this._emailFilter;
  }
  public get MobileFilter(): string {
    return this._mobileFilter;
  }

  public set NameEnglishFilter(v: string) {
    this._nameEnglishFilter = v;
    const filter = `nameEnglish:${v}`;
    this.filterObservable$.next(filter);
  }
  public set NameArabicFilter(v: string) {
    this._nameArabicFilter = v;
    const filter = `nameSecondLanguage:${v}`;
    this.filterObservable$.next(filter);
  }
  public set EmailFilter(v: string) {
    this._emailFilter = v;
    const filter = `email:${v}`;
    this.filterObservable$.next(filter);
  }
  public set MobileFilter(v: string) {
    this._mobileFilter = v;
    const filter = `mobile:${v}`;
    this.filterObservable$.next(filter);
  }
  // _casNumberFilter: string;
  public filterObservable$: Subject<string> = new Subject<string>();

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private countryService: CountryService,
    private commonDialogService: CommonDialogService,
    private router: Router,
    public translationService: TranslationService,
    private dialog: MatDialog,
    private commonService: CommonService,
    private cd: ChangeDetectorRef
  ) {
    super();

    this.employeeResources = new EmployeeResourceParameter();
    this.employeeResources.pageSize = 20;
    this.employeeResources.orderBy = 'nameEnglish asc';

    this.dataSource = new EmployeeListDataSource(this.employeeService);
  }
  ngOnInit(): void {
    this.dataSource = new EmployeeListDataSource(this.employeeService);
    this.dataSource.loadData(this.employeeResources);
    this.getResourceParameter();
    //   this.getCountries();
    this.sub$.sink = this.filterObservable$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((c) => {
        this.employeeResources.skip = 0;
        const strArray: Array<string> = c.split(':');
        if (strArray[0] === 'nameEnglish') {
          this.employeeResources.nameEnglish = escape(strArray[1]);
        } else if (strArray[0] === 'nameSecondLanguage') {
          this.employeeResources.nameSecondLanguage = strArray[1];
        } else if (strArray[0] === 'mobile') {
          this.employeeResources.mobile = strArray[1];
        } else if (strArray[0] === 'email') {
          this.employeeResources.email = encodeURI(strArray[1].trim());
        }
        // else if (strArray[0] === 'country') {
        //   this.employeeResources.country = strArray[1];
        // }
        this.dataSource.loadData(this.employeeResources);
      });

    // this.filteredCountryList = this.countryControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filterCountryForAutoComplete(value)),
    // );
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.employeeResources.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.employeeResources.pageSize = this.paginator.pageSize;
          this.employeeResources.orderBy =
            this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.employeeResources);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.employeeResources.pageSize = c.pageSize;
          this.employeeResources.skip = c.skip;
          this.employeeResources.totalCount = c.totalCount;
        }
      }
    );
  }

  deleteEmployee(employee: Employee) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${this.translationService.getValue(
          'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
        )} ${employee.nameEnglish}`
      )
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.employeeService
            .deleteEmployee(employee.accountUUID)
            .subscribe(() => {
              this.toastrService.success('Employee Deleted Successfully');
              this.paginator.pageIndex = 0;
              //this.employeeResource.name = this.input.nativeElement.value;
              this.dataSource.loadData(this.employeeResources);
            });
        }
      });
  }
  editEmployee(employeeId: string) {
    this.router.navigate(['/employee/manage/', employeeId]);
  }
}
