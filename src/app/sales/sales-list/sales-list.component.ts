import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { ISalesInvoice } from '@core/domain-classes/sales-invoice';
import { SalesInvoiceResourceParameter } from '@core/domain-classes/sales-resourceParameter';
import { TranslationService } from '@core/services/translation.service';
import { Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, skip, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { SalesService } from '../sales.service';
import { SalesInvoiceDataSource } from './sale-Invoice-datasource';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SalesListComponent extends BaseComponent implements OnInit {
  searchForm:FormGroup;
  dataSource: SalesInvoiceDataSource;
  displayedColumns: string[] = [ 'docDate', 'docNo', 'supplier', 'transaction', 'totalDiscount', 'totalTax','totalExpenses', 'totalAmount','action'];
  filterColumns: string[] = ['Date-search', 'invoiceNumber-search','action-search' ];
  transactionMode:string[]=["CASH","CREDIT"]
  footerToDisplayed: string[] = ['footer'];
  salesOrderResource: SalesInvoiceResourceParameter;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   _invoiceNumberFilter: string;
  _invoiceDateFilter:string
  expandedElement: ISalesInvoice | null;
  public filterObservable$: Subject<string> = new Subject<string>();
  branchUUID = ''


  public get invoiceNumberFilter(): string {
    return this._invoiceNumberFilter;
  }
  public get InvoiceDateFilter(): string {
    return this._invoiceDateFilter;
  }
  public set invoiceNumberFilter(v: string) {
    this._invoiceNumberFilter = v;
    const Filter = `docNo:${v}`;
    this.filterObservable$.next(Filter);
  }
  public set InvoiceDateFilter(v: string) {
    this._invoiceDateFilter = v;
    const Filter = `docDate:${v}`;
    this.filterObservable$.next(Filter);
  }

  constructor(
    private fb:FormBuilder,
    private salesOrderService: SalesService,
    private cd: ChangeDetectorRef,
    public translationService: TranslationService,
    private branchService:BranchService
    ) {
    super();
    this.salesOrderResource = new SalesInvoiceResourceParameter();
    this.salesOrderResource.pageSize = 10;
    this.salesOrderResource.orderBy = 'docNo asc'
    this.salesOrderResource.branchUUID = this.branchUUID
    this.salesOrderResource.deviceUUID = ''
  }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.createSearchForm();
    this.onLoadData();
  }
  onLoadData():void{
    this.dataSource = new SalesInvoiceDataSource(this.salesOrderService);
    this.searchForm.valueChanges
    .pipe(
      skip(1), // Skip the first emission which happens on form initialization
      debounceTime(500), // Adjust the debounce time as needed
      first()
    )
    .subscribe(() => {
      const formValues = this.searchForm.getRawValue()
      this.setSaleInvoiceResource(formValues);
      this.dataSource.loadData(this.salesOrderResource);
    });
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((c) => {
        this.salesOrderResource.skip = 0;
        const strArray: Array<string> = c.split(':');
        if (strArray[0] === 'docNo') {
          this.salesOrderResource.docNo = strArray[1];
        } else if (strArray[0] === 'docDate') {
          this.salesOrderResource.docDate = new Date (strArray[1]);
        }
        this.dataSource.loadData(this.salesOrderResource);
      });
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      branchUUID: [''],
      deviceUUID: [''],
      fromDate:['',Validators.required],
      toDate :['',Validators.required],
    });
  }

  onSearchSubmit() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;}
      
      const formValues = this.searchForm.getRawValue();
      this.setSaleInvoiceResource(formValues);
      this.dataSource.loadData(this.salesOrderResource);

  }
  setSaleInvoiceResource(formValues: any): void {
    this.salesOrderResource.fromDate = formValues.fromDate;
    this.salesOrderResource.toDate = formValues.toDate;
    this.salesOrderResource.deviceUUID = formValues.deviceUUID;
    this.salesOrderResource.branchUUID = formValues.branchUUID;
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.salesOrderResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.salesOrderResource.pageSize = this.paginator.pageSize;
          this.salesOrderResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.salesOrderResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.salesOrderResource.pageSize = c.pageSize;
          this.salesOrderResource.skip = c.skip;
          this.salesOrderResource.totalCount = c.totalCount;
        }
      });
  }

  toggleRow(element: ISalesInvoice) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.cd.detectChanges();
  }

  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      deviceUUID:''
    })
}

}
