import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { Country } from '@core/domain-classes/country';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { Supplier } from '@core/domain-classes/supplier';
import { SupplierResourceParameter } from '@core/domain-classes/supplier-resource-parameter';
import { CommonService } from '@core/services/common.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { merge, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap,
} from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
// import { AddSupplierChemicalComponent } from '../add-supplier-chemical/add-supplier-chemical.component';
import { SupplierService } from '../supplier.service';
import { SupplierDataSource } from './supplier-datasource';
import { SupplierAccountResourceParameter } from '@core/domain-classes/supplier-account-resourceparameter';
import { ISupplierAccount } from '@core/domain-classes/supplierAccount';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SupplierListComponent extends BaseComponent implements OnInit {
  dataSource: SupplierDataSource;
  suppliers: Supplier[] = [];
  displayedColumns: string[] = [
    'nameEnglish',
    // 'nameSecondLanguage',
    'email',
    'Mobile',
    'vat',
    //'reg-no',
    'district',
    // 'state',
    //'sales-man',
    'action',
  ];
  searchColumns: string[] = [
    // 'nameEnglish-Search',
    // 'email-Search',
    // 'mobile-Search',
    // 'vat-Search',
    // 'regNo-Search',
    // 'district-Search',
    // 'salesMan-Search',
    // 'action-Search',
  ];
  columnsToDisplay: string[] = ['footer'];
  countryList: Country[] = [];
  filteredCountryList: Observable<Country[]>;
  countryControl = new FormControl();
  isLoadingResults = true;
  supplierResource: SupplierAccountResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _nameFilter: string;
  _nameArFilter: string;
  _emailFilter: string;
  _mobileOrPhoneFilter: string;
  _websiteFilter: string;
  _countryFilter: string;
  public filterObservable$: Subject<string> = new Subject<string>();
  expandedElement: Supplier | null;

  public get NameFilter(): string {
    return this._nameFilter;
  }

  public set NameFilter(v: string) {
    this._nameFilter = v;
    const nameFilter = `nameEnglish##${v}`;
    this.filterObservable$.next(nameFilter);
  }
  public get NameArFilter(): string {
    return this._nameArFilter;
  }

  public set NameArFilter(v: string) {
    this._nameArFilter = v;
    const nameFilter = `nameSecondLanguage##${v}`;
    this.filterObservable$.next(nameFilter);
  }

  public get WebsiteFilter(): string {
    return this._websiteFilter;
  }

  public get CountryFilter(): string {
    return this._countryFilter;
  }

  public set CountryFilter(v: string) {
    this._countryFilter = v;
    const countryFilter = `country##${v}`;
    this.filterObservable$.next(countryFilter);
  }

  public set WebsiteFilter(v: string) {
    this._websiteFilter = v;
    const websiteFilter = `website##${v}`;
    this.filterObservable$.next(websiteFilter);
  }

  public get EmailFilter(): string {
    return this._emailFilter;
  }
  public set EmailFilter(v: string) {
    this._emailFilter = v;
    const emailFilter = `email##${v}`;
    this.filterObservable$.next(emailFilter);
  }

  public get MobileOrPhoneFilter(): string {
    return this._mobileOrPhoneFilter;
  }

  public set MobileOrPhoneFilter(v: string) {
    this._mobileOrPhoneFilter = v;
    const mobileOrFilter = `mobileNo##${v}`;
    this.filterObservable$.next(mobileOrFilter);
  }

  constructor(
    private supplierService: SupplierService,
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private router: Router,
    public translationService: TranslationService,
    private dialog: MatDialog,
    private commonService: CommonService,
    private cd: ChangeDetectorRef,
    private branchService : BranchService
  ) {
    super();
    this.supplierResource = new SupplierAccountResourceParameter();
    this.supplierResource.pageSize = 10;
    this.supplierResource.orderBy = 'nameEnglish asc';

    this.dataSource = new SupplierDataSource(this.supplierService);
  }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    // this.dataSource = new SupplierAccountResourceParameter();
    this.dataSource = new SupplierDataSource(this.supplierService);

    this.dataSource.loadData(this.supplierResource);
    this.getResourceParameter();
    // this.getCountries();
    this.sub$.sink = this.filterObservable$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((c) => {
        this.supplierResource.skip = 0;
        const strArray: Array<string> = c.split('##');
        if (strArray[0] === 'nameEnglish') {
          this.supplierResource.nameEnglish = escape(strArray[1]);
        } else if (strArray[0] === 'nameSecondLanguage') {
          this.supplierResource.nameSecondLanguage = strArray[1];
        } else if (strArray[0] === 'email') {
          this.supplierResource.email = strArray[1];
        } else if (strArray[0] === 'mobileNo') {
          this.supplierResource.mobileNo = strArray[1];
        } else if (strArray[0] === 'website') {
          this.supplierResource.website = encodeURI(strArray[1].trim());
        } else if (strArray[0] === 'country') {
          this.supplierResource.country = strArray[1];
        }
        this.dataSource.loadData(this.supplierResource);
      });

    this.filteredCountryList = this.countryControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCountryForAutoComplete(value))
    );
  }

  private _filterCountryForAutoComplete(value: string) {
    const filterValue = value.toLowerCase();
    return this.countryList.filter((country) =>
      country.nameEnglish.toLowerCase().includes(filterValue)
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.supplierResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.supplierResource.pageSize = this.paginator.pageSize;
          this.supplierResource.orderBy =
            this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.supplierResource);
        })
      )
      .subscribe();
  }

  getCountries() {
    this.sub$.sink = this.commonService
      .getCountry()
      .subscribe((c) => (this.countryList = c));
  }

  deleteSupplier(supplier: ISupplierAccount) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${this.translationService.getValue(
          'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
        )} ${supplier.nameEnglish}`
      )
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.supplierService
            .deleteSupplier(supplier.accountUUID)
            .subscribe(() => {
              this.toastrService.success('Supplier Deleted Successfully.');
              this.paginator.pageIndex = 0;
              //this.supplierResource.name = this.input.nativeElement.value;
              this.dataSource.loadData(this.supplierResource);
            });
        }
      });
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.supplierResource.pageSize = c.pageSize;
          this.supplierResource.skip = c.skip;
          this.supplierResource.totalCount = c.totalCount;
        }
      }
    );
  }

  editSupplier(supplierId: string) {
    this.router.navigate(['/supplier/manage', supplierId]);
  }

  // viewChemical(supplier: Supplier): void {
  //   this.dialog.open(ChemicalListComponent, {
  //     height: 'auto',
  //     data: Object.assign({}, supplier)
  //   });
  // }

  // addChemcialSupplier(supplier: Supplier) {
  //   const dialogRef = this.dialog.open(AddSupplierChemicalComponent, {
  //     width: '40vw',
  //     height: 'auto',
  //     data: Object.assign({}, supplier)
  //   });
  //   this.sub$.sink = dialogRef.afterClosed()
  //     .subscribe(result => {
  //       if (result["flag"]) {
  //         this.dataSource.loadData(this.supplierResource);
  //       }
  //     });
  // }

  toggleRow(supplier: Supplier) {
    this.expandedElement = this.expandedElement === supplier ? null : supplier;
    this.cd.detectChanges();
  }
}
