import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IPurchaseInvoice } from '@core/domain-classes/purchase-order/purchase-invoice';
import { PurchaseInvoiceResourceParameter } from '@core/domain-classes/purchase-order/purchase-invoice-resource-parameter';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { merge, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  skip,
  tap,
} from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { PurchaseService } from '../purchase.service';
import { PurchaseDataSource } from './purchase-datasource';
import { LoaderService } from '@shared/services/loader.service';
import { Router } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss'],
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
export class PurchaseListComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    
    'docDate',
    'docNo',
    // 'refBillDate',
    // 'refBillNo',
    'supplierName',
    'transactionMode',
    // 'totalDiscount',
    // 'totalCgstAmount',
    // 'totalSgstAmount',
    // 'totalIgstAmount',
    // 'totalCessAmount',
    // 'totalAdnlCessAmount',
    // 'totalExpenses',
    'totalAmount',
    'action'
  ];
  filterColumns: string[] = [
    'action-search',
    'docDate-search',
    'docNo-search',
    // 'refBillDate-search',
    // 'refBillNo-search',
    'supplierName-search',
    'transactionMode-search',
    // 'totalDiscount-search',
    // 'totalCgstAmount-search',
    // 'totalSgstAmount-search',
    // 'totalIgstAmount-search',
    // 'totalCessAmount-search',
    // 'totalAdnlCessAmount-search',
    // 'totalExpenses-search',
    'totalAmount-search',
  ];
  footerToDisplayed: string[] = ['footer'];
  dataSource: PurchaseDataSource;
  purchaseInvoiceResource: PurchaseInvoiceResourceParameter;
  searchForm: FormGroup;
  filterForm: FormGroup;
  isLoading$: boolean = false;
  _docDateFilter: string;
  _docNoFilter: string;
  expandedElement: IPurchaseInvoice | null;
  branchUUID: string = '';
  defaultPageSize: number = environment.initialPageSize;
  pageSizeOptions: number[] = environment.pageSizeOptions;

 
  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private router: Router,
    private cd: ChangeDetectorRef,
    public translationService: TranslationService,
    private commonDialogService: CommonDialogService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private branchService:BranchService
  ) {
    super();
    this.purchaseInvoiceResource = new PurchaseInvoiceResourceParameter();
    this.purchaseInvoiceResource.pageSize = this.defaultPageSize;
    this.purchaseInvoiceResource.orderBy = 'docNo asc';
    this.purchaseInvoiceResource.branchUUID = '';
    this.purchaseInvoiceResource.deviceUUID = '';
  }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.loaderShowOrHide();
    this.createSearchForm();
    this.createFilterForm()
    this.onLoadData();
  }

  loaderShowOrHide() {
    this.loader.isLoading$.subscribe(
      (isLoading) => (this.isLoading$ = isLoading)
    );
  }
  onLoadData() {
    this.dataSource = new PurchaseDataSource(this.purchaseService);
    this.searchForm.valueChanges
      .pipe(
        skip(1), // Skip the first emission which happens on form initialization
        debounceTime(500), // Adjust the debounce time as needed
        first()
      )
      .subscribe(() => {
      const formValues = this.searchForm.getRawValue()

        this.setPurchaseInvoiceResource(formValues);
        this.dataSource.loadData(this.purchaseInvoiceResource);
      });
    this.getResourceParameter();
    this.sub$.sink = this.filterForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged(),skip(1))
      .subscribe(() => {
        const formValues = this.filterForm.getRawValue()
        this.purchaseInvoiceResource.skip = 0;
        this.purchaseInvoiceResource.docDate = formValues.docDate;
        this.purchaseInvoiceResource.docNo = formValues.docNo;
        this.dataSource.loadData(this.purchaseInvoiceResource);
      });
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      branchUUID: [''],
      deviceUUID: [''],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }
  createFilterForm():void{
    this.filterForm = this.fb.group({
      docDate:[''],
      docNo:['']
    })
  }

  onSearchSubmit() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const formValues = this.searchForm.getRawValue();
    this.setPurchaseInvoiceResource(formValues);
    this.dataSource.loadData(this.purchaseInvoiceResource);
  }

  setPurchaseInvoiceResource(formValues: any): void {
    this.purchaseInvoiceResource.fromDate = formValues.fromDate;
    this.purchaseInvoiceResource.toDate = formValues.toDate;
    this.purchaseInvoiceResource.deviceUUID = formValues.deviceUUID;
    this.purchaseInvoiceResource.branchUUID = formValues.branchUUID;
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.purchaseInvoiceResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.purchaseInvoiceResource.pageSize = this.paginator.pageSize;
          this.purchaseInvoiceResource.orderBy =
            this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.purchaseInvoiceResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.purchaseInvoiceResource.pageSize = c.pageSize;
          this.purchaseInvoiceResource.skip = c.skip;
          this.purchaseInvoiceResource.totalCount = c.totalCount;
        }
      }
    );
  }

  toggleRow(element: IPurchaseInvoice) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.cd.detectChanges();
  }

  generateBarcode(purchaseId: string) {
    this.router.navigate(['/purchase-invoice/barcode-generate/', purchaseId]);
  }

  parentBranchHandlerFunction(valueEmitted) {
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      deviceUUID: '',
    });
  }

  deletePurchase(item: IPurchaseInvoice) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(
        `${this.translationService.getValue(
          'COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE'
        )} ${item.docNo}`
      )
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.purchaseService
            .deletePurchase(item.purchaseInvoiceUUID)
            .subscribe(() => {
              this.toastr.success(
                // this.translationService.getValue('PRODUCT_DELETED_SUCCESSFULLY')
                'Purchase Deleted SuccessFully'
              );
              this.paginator.pageIndex = 0;
              this.dataSource.loadData(this.purchaseInvoiceResource);
            });
        }
      });
  }


  removeDate():void{
    this.filterForm.get('docDate').reset()
  }
}
