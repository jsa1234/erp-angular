import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IAccountHead } from '@core/domain-classes/account-head';
import { AccountHeadResourceParameter } from '@core/domain-classes/account-head-resource-parameter';
import { AccountGroup } from '@core/domain-classes/enums/account-group.enum';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { TranslationService } from '@core/services/translation.service';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { StatementOfAccountsService } from 'src/app/reports/statement-of-accounts/statement-of-accounts.service';
import { AccountHeadDataSource } from '../account-head-datasource';
import { AccountHeadService } from '../account-head.service';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent extends BaseComponent implements OnInit {
  searchForm: FormGroup;
  dataSource: AccountHeadDataSource;
  isLoading = false;
  id?: string;
  enum = AccountGroup;
  displayedColumns: string[] = [
    'accountCode',
    'nameEnglish',
    // 'nameSecondLanguage',
    'acoountDetailType',
  ];
  filterColumns: string[] = [
    'code-search',
    'nameEnglish-search',
    // 'nameSecondLanguage-search',
    'group-search',
  ];
  footerToDisplayed: string[] = ['footer'];
  isLoadingResults = true;
  accountHeadResource: AccountHeadResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _accountCodeFilter: string;
  _nameEnglishFilter: string;
  _nameArabicFilter: string;
  public filterObservable$: Subject<string> = new Subject<string>();
  groupList: IAccountHead[];
  subledgerList: IAccountHead[];
  ledgerList: IAccountHead[];

  public get AccountCodeFilter(): string {
    return this._accountCodeFilter;
  }

  public set AccountCodeFilter(v: string) {
    this._accountCodeFilter = v;
    const Filter = `accountCode:${v}`;
    this.filterObservable$.next(Filter);
  }

  public get NameEnglishFilter(): string {
    return this._nameEnglishFilter;
  }

  public set NameEnglishFilter(v: string) {
    this._nameEnglishFilter = v;
    const Filter = `nameEnglish:${v}`;
    this.filterObservable$.next(Filter);
  }
  public get NameArabicFilter(): string {
    return this._nameArabicFilter;
  }

  public set NameArabicFilter(v: string) {
    this._nameArabicFilter = v;
    const Filter = `nameSecondLanguage:${v}`;
    this.filterObservable$.next(Filter);
  }

  constructor(
    private accountHeadService: AccountHeadService,

    private accountsService: StatementOfAccountsService,

    private fb: FormBuilder,

    public translationService: TranslationService,
    private branchService:BranchService
  ) {
    super();
    this.accountHeadResource = new AccountHeadResourceParameter();
    this.accountHeadResource.pageSize = 10;
    this.accountHeadResource.orderBy = 'nameEnglish asc';
  }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.onLoadData();
    this.getAllAccountGroup();
    this.createSearchForm();
  }

  onLoadData() {
    this.dataSource = new AccountHeadDataSource(this.accountHeadService);
    this.dataSource.loadData(this.accountHeadResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((c) => {
        this.accountHeadResource.skip = 0;
        const strArray: Array<string> = c.split(':');
        if (strArray[0] === 'nameEnglish') {
          this.accountHeadResource.nameEnglish = strArray[1];
        } else if (strArray[0] === 'nameSecondLanguage') {
          this.accountHeadResource.nameSecondLanguage = strArray[1];
        } else if (strArray[0] === 'accountCode') {
          this.accountHeadResource.accountCode = strArray[1];
        }
        this.dataSource.loadData(this.accountHeadResource);
      });
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      group: [''],
      ledger: [''],
      subledger: [''],
    });
  }
  getAllAccountGroup() {
    this.sub$.sink = this.accountsService
      .getAccountGroups()
      .subscribe((res: IAccountHead[]) => {
        this.groupList = res;
      });
    this.subledgerList = [];
  }

  getAllLedger(value: string) {
    this.sub$.sink = this.accountsService
      .getLedger(value)
      .subscribe((res: IAccountHead[]) => {
        this.ledgerList = res;
      });
    this.searchForm.patchValue({
      ledger: '',
      subledger: '',
    });
    this.subledgerList = [];
  }

  getAllSubLedger(value: string) {
    this.sub$.sink = this.accountsService
      .getSubLedger(value)
      .subscribe((res: IAccountHead[]) => {
        this.subledgerList = res;
      });
    this.searchForm.patchValue({
      subledger: '',
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.accountHeadResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.accountHeadResource.pageSize = this.paginator.pageSize;
          this.accountHeadResource.orderBy =
            this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.accountHeadResource);
        })
      )
      .subscribe();
  }

  onSearch() {
    if (!this.searchForm.valid) return;
    this.accountHeadResource.group = this.searchForm.get('group').value;
    this.accountHeadResource.ledger = this.searchForm.get('ledger').value;
    this.accountHeadResource.subledger = this.searchForm.get('subledger').value;
    this.dataSource.loadData(this.accountHeadResource);
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.accountHeadResource.pageSize = c.pageSize;
          this.accountHeadResource.skip = c.skip;
          this.accountHeadResource.totalCount = c.totalCount;
        }
      }
    );
  }
}
