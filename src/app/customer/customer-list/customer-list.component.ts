import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { CustomerService } from '../customer.service';
import { merge, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Customer } from '@core/domain-classes/customer';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { CustomerDataSource } from './customer-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { CustomerAccountResourceParameter } from '@core/domain-classes/customer-account-Resourceparameter';
import { ICustomerAccount } from '@core/domain-classes/customer-account';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent extends BaseComponent implements OnInit {
  dataSource: CustomerDataSource;
  customers: ICustomerAccount[] = [];
  displayedColumns: string[] = [
    
    'nameEnglish',
    // 'nameSecondLanguage',
    'email',
    'mobileNo',
    'state',
    'district',
    'salesman',
    'action',
  ];
  searchHeader: string[] = [
   
    'nameEnglish-search',
    // 'nameSecondLanguage-search',
    'email-search',
    'mobNo-search',
    'sales-search',
    'sales-search',
    'sales-search',
    'action-search',
  ];
  columnsToDisplay: string[] = ['footer'];
  isLoadingResults = true;
  customerResource: CustomerAccountResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _nameFilter: string;

  _mobileOrPhoneFilter: string;
  _websiteFilter: string;
  _contactPersonFilter: string;
  public filterObservable$: Subject<string> = new Subject<string>();
  expandedElement: Customer | null;

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

  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private router: Router,
    public translationService: TranslationService
  ) {
    super();
    this.customerResource = new CustomerAccountResourceParameter();
    this.customerResource.pageSize = 50;
    this.customerResource.orderBy = 'NameEnglish asc';
  }

  ngOnInit(): void {
    this.dataSource = new CustomerDataSource(this.customerService);
    this.dataSource.loadData(this.customerResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((c) => {
        this.customerResource.skip = 0;
        const strArray: Array<string> = c.split(':');
        if (strArray[0] === 'nameEnglish') {
          this.customerResource.nameEnglish = escape(strArray[1]);
        } else if (strArray[0] === 'email') {
          this.customerResource.email = strArray[1];
        } else if (strArray[0] === 'mobile') {
          this.customerResource.mobileNo = strArray[1];
        } else if (strArray[0] === 'nameSecondLanguage') {
          this.customerResource.nameSecondLanguage = strArray[1];
        }
        this.dataSource.loadData(this.customerResource);
      });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.customerResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.customerResource.pageSize = this.paginator.pageSize;
          this.customerResource.orderBy =
            this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.customerResource);
        })
      )
      .subscribe();
  }

  deleteCustomer(customer: ICustomerAccount) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${this.translationService.getValue(
          'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
        )} ${customer.nameEnglish}`
      )
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.customerService
            .deleteCustomer(customer.accountUUID)
            .subscribe(() => {
              this.toastrService.success('Customer Deleted Successfully');
              this.paginator.pageIndex = 0;
              this.dataSource.loadData(this.customerResource);
            });
        }
      });
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.customerResource.pageSize = c.pageSize;
          this.customerResource.skip = c.skip;
          this.customerResource.totalCount = c.totalCount;
        }
      }
    );
  }

  editCustomer(customerId: string) {
    this.router.navigate(['/customer/manage/', customerId]);
  }
}