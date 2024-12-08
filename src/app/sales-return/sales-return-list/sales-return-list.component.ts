import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ResponseHeader } from '@core/domain-classes/response-header';

import { SalesOrder } from '@core/domain-classes/sales-order';
import { SalesReturn } from '@core/domain-classes/sales-return';
import { SalesReturnResourceParameter } from '@core/domain-classes/sales-return-resource-parameter';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, skip, tap } from 'rxjs/operators';

import { BaseComponent } from 'src/app/base.component';
import { SalesService } from 'src/app/sales/sales.service';
import { SalesReturnDataSource } from './sales-return.datasource';


@Component({
  selector: 'app-sales-return-list',
  templateUrl: './sales-return-list.component.html',
  styleUrls: ['./sales-return-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SaleReturnListComponent extends BaseComponent implements OnInit {

  searchForm:FormGroup
  dataSource: SalesReturnDataSource;
  displayedColumns: string[] = [ 'invoiceDate', 'invoiceNumber', 'customerName', 'transaction', 'totalDiscount', 'totalTax', 'totalAmount','action'];
  filterColumns: string[] = ['action-search', 'invoiceDate-search', 'invoiceNumber-search', 'customerName-search', 'transaction-search', 'totalDiscount-search', 'totalTax-search', 'totalAmount-search'];
  footerToDisplayed: string[] = ['footer'];

  salesReturnResource: SalesReturnResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  _invoiceDateFilter: string;
  _invoiceNoFilter: string;
  expandedElement: SalesReturn | null;
  public filterObservable$: Subject<string> = new Subject<string>();
  branchUUID=''
  // purchaseOrderForInvoice: PurchaseOrder;
  public get InvoiceDateFilter(): string {
    return this._invoiceDateFilter;
  }

  public set InvoiceDateFilter(v: string) {
    this._invoiceDateFilter = v;
    const invoiceDateFilter = `invoiceDate:${v}`;
    this.filterObservable$.next(invoiceDateFilter);
  }

  public get InvoiceNumberFilter(): string {
    return this._invoiceNoFilter;
  }

  public set InvoiceNumberFilter(v: string) {
    this._invoiceNoFilter = v;
    const invoiceNoFilter = `invoiceNumber:${v}`;
    this.filterObservable$.next(invoiceNoFilter);
  }
  constructor(
    public translationService:TranslationService,
    private fb:FormBuilder,
    private salesReturnService:SalesService,
    private cd: ChangeDetectorRef,
    ) {
    super();
    this.salesReturnResource = new SalesReturnResourceParameter();
    this.salesReturnResource.pageSize = 10;
    this.salesReturnResource.orderBy = 'invoiceNumber asc'
  }

  ngOnInit(): void {
    this.createSearchForm();
    this.onLoadData();
  }

  createSearchForm(){
  this.searchForm = this.fb.group({
    branchUUID: [''],
    deviceUUID: [''],
    fromDate:[,Validators.required],
    toDate :[,Validators.required],
  })
}
toggleRow(element: SalesReturn) {
  this.expandedElement = this.expandedElement === element ? null : element;
  this.cd.detectChanges();
}

setSaleReturnResource(formValues: any): void {
  this.salesReturnResource.fromDate = formValues.fromDate;
  this.salesReturnResource.toDate = formValues.toDate;
  this.salesReturnResource.deviceUUID = formValues.deviceUUID;
  this.salesReturnResource.branchUUID = formValues.branchUUID;
}

onSearchSubmit() {
  if (this.searchForm.invalid) {
    this.searchForm.markAllAsTouched();
    return;
  }
    const formValues = this.searchForm.getRawValue();
    this.setSaleReturnResource(formValues);
    this.dataSource.loadData(this.salesReturnResource);
}
  onLoadData()
  {
    this.dataSource = new SalesReturnDataSource(this.salesReturnService);
    this.searchForm.valueChanges
    .pipe(
      skip(1), // Skip the first emission which happens on form initialization
      debounceTime(500), // Adjust the debounce time as needed
      first()
    )
    .subscribe(() => {
      const formValues = this.searchForm.getRawValue()
      this.setSaleReturnResource(formValues);
      this.dataSource.loadData(this.salesReturnResource);
    });
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((c) => {
        this.salesReturnResource.skip = 0;
        const strArray: Array<string> = c.split(':');
        if (strArray[0] === 'invoiceDate') {
          this.salesReturnResource.invoiceDate  =new Date(strArray[1]);
        } else if (strArray[0] === 'invoiceNumber') {
          this.salesReturnResource.invoiceNumber = strArray[1];
        }
        this.dataSource.loadData(this.salesReturnResource);
      });
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.salesReturnResource.pageSize = c.pageSize;
          this.salesReturnResource.skip = c.skip;
          this.salesReturnResource.totalCount = c.totalCount;
        }
      });
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.salesReturnResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.salesReturnResource.pageSize = this.paginator.pageSize;
          this.salesReturnResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.salesReturnResource);
        })
      )
      .subscribe();
  }

  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      deviceUUID:''
    })
}

}
