import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PurchaseReturnResourceParameter } from '@core/domain-classes/purchase-order/purchase-return-resource';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { TranslationService } from '@core/services/translation.service';
import {  Subject, merge,  } from 'rxjs';
import { debounceTime, distinctUntilChanged,  first,  skip,  tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { PurchaseService } from 'src/app/purchase/purchase.service';
import { PurchaseReturnDataSource } from './purchase-return-datasource';
import { LoaderService } from '@shared/services/loader.service';
import { PurchaseReturnDetail } from '@core/domain-classes/purchase-order/purchase-return-details';
import { IPurchaseReturn } from '@core/domain-classes/purchase-order/purchase-return-invoice';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { PurchaseReturnService } from '../purchase-return.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-return-list',
  templateUrl: './purchase-return-list.component.html',
  styleUrls: ['./purchase-return-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PurchaseReturnListComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['action', 'docDate', 'docNo', 'supplierName', 'transactionMode', 'totalDiscount', 'totalTax', 'totalAmount'];
  filterColumns: string[] = ['action-search', 'docDate-search', 'docNo-search', 'supplierName-search', 'transactionMode-search', 'totalDiscount-search', 'totalTax-search', 'totalAmount-search'];
  footerToDisplayed: string[] = ['footer'];
  dataSource: PurchaseReturnDataSource;
  purchaseReturnResource: PurchaseReturnResourceParameter;
  searchForm: FormGroup;
  isLoading$:boolean =false;
  _docDateFilter: string;
  _docNoFilter: string;
  expandedElement: PurchaseReturnDetail | null;
  public filterObservable$: Subject<string> = new Subject<string>();
  branchUUID='';
  public get docDateFilter(): string {
    return this._docDateFilter;
  }

  public set docDateFilter(v: string) {
    this._docDateFilter = v;
    const docDateFilter = `docDate:${v}`;
    this.filterObservable$.next(docDateFilter);
  }

  public get docNoFilter(): string {
    return this._docNoFilter;
  }

  public set docNoFilter(v: string) {
    this._docNoFilter = v;
    const docNoFilter = `docNo:${v}`;
    this.filterObservable$.next(docNoFilter);
  }

  constructor(
    private fb: FormBuilder,
    private purchaseReturnService: PurchaseReturnService,
    private cd: ChangeDetectorRef,
    public translationService: TranslationService,
    public commonDialogService: CommonDialogService,
    public toastr: ToastrService,
    private loader:LoaderService) {
    super();
    this.purchaseReturnResource = new PurchaseReturnResourceParameter();
    this.purchaseReturnResource.pageSize = 10;
    this.purchaseReturnResource.orderBy = 'docNo asc';
    this.purchaseReturnResource.deviceUUID = '';
    this.purchaseReturnResource.branchUUID = '';
  }

  ngOnInit(): void {
    this.loaderShowOrHide()
    this.createSearchForm();
    this.onLoadData();
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  setPurchaseReturnResource(formValues: any): void {
    this.purchaseReturnResource.fromDate = formValues.fromDate;
    this.purchaseReturnResource.toDate = formValues.toDate;
    this.purchaseReturnResource.deviceUUID = formValues.deviceUUID;
    this.purchaseReturnResource.branchUUID = formValues.branchUUID;
  }
  onLoadData()
  {
    this.dataSource = new PurchaseReturnDataSource(this.purchaseReturnService);
    this.searchForm.valueChanges
    .pipe(
      skip(1), // Skip the first emission which happens on form initialization
      debounceTime(500), // Adjust the debounce time as needed
      first()
    )
    .subscribe(() => {
      const formValues = this.searchForm.getRawValue()

      this.setPurchaseReturnResource(formValues);
      this.dataSource.loadData(this.purchaseReturnResource);
    });
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((c) => {
        this.purchaseReturnResource.skip = 0;
        const strArray: Array<string> = c.split(':');
        if (strArray[0] === 'docDate') {
          this.purchaseReturnResource.invoiceDate  =new Date(strArray[1]);
          if(isNaN(this.purchaseReturnResource.invoiceDate.getTime()))
          {
            this.purchaseReturnResource.invoiceDate = null;
          }
        } else if (strArray[0] === 'docNo') {
          this.purchaseReturnResource.invoiceNumber = strArray[1];
        }
        this.dataSource.loadData(this.purchaseReturnResource);
      });
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      branchUUID:[''],
      deviceUUID: [''],
      fromDate:['',Validators.required],
      toDate :['',Validators.required]
    });
  }
  onSearchSubmit() {
    if (this.searchForm.invalid) { 
      this.searchForm.markAllAsTouched();
      return; }
      const formValues = this.searchForm.getRawValue();
      this.setPurchaseReturnResource(formValues);
      this.dataSource.loadData(this.purchaseReturnResource);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.purchaseReturnResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.purchaseReturnResource.pageSize = this.paginator.pageSize;
          this.purchaseReturnResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.purchaseReturnResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.purchaseReturnResource.pageSize = c.pageSize;
          this.purchaseReturnResource.skip = c.skip;
          this.purchaseReturnResource.totalCount = c.totalCount;
        }
      });
  }

  toggleRow(element: PurchaseReturnDetail) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.cd.detectChanges();
  }



  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      deviceUUID:''
    })
}


deletePurchaseReturn(item:IPurchaseReturn){
  this.sub$.sink = this.commonDialogService
  .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${item.docNo}`)
  .subscribe((isTrue: boolean) => {
    if (isTrue) {
      this.sub$.sink = this.purchaseReturnService.deletePurchaseReturn(item.purchaseReturnUUID)
        .subscribe(() => {
          this.toastr.success(this.translationService.getValue('PURCHASE_RETURN_DELETED_SUCCESSFULLY'));
          this.paginator.pageIndex = 0;
          this.dataSource.loadData(this.purchaseReturnResource);
        });
    }
  });
}



}
