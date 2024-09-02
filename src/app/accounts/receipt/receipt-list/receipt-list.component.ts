import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { SalesOrder } from '@core/domain-classes/sales-order';
import { IVoucher } from '@core/domain-classes/voucher';
import { VoucherResourceParameter } from '@core/domain-classes/voucher-resource-parameter';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, skip, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { ReceiptService } from '../receipt.service';
import { ReceiptDataSource } from './receipt.datasource';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReceiptListComponent extends BaseComponent implements OnInit {
  dataSource: ReceiptDataSource;
  searchForm:FormGroup
  displayedColumns: string[] = ['action', 'docNo', 'docDate', 'Amount','User'];
  filterColumns: string[] = ['action-search', 'ReceptNo-search','ReceptDate-search','Amount-search',  'User-search'];
  footerToDisplayed: string[] = ['footer'];
  isLoading$: boolean =false;
  receiptResource: VoucherResourceParameter;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  expandedElement: IVoucher | null;
  branchUUID: string;
  pageSizeOptions:number[]
  filterForm: FormGroup;


  constructor(
    private receiptService:ReceiptService,
    private cd: ChangeDetectorRef,
    private fb:FormBuilder,
    public translationService: TranslationService,
    private loader:LoaderService,
    private toastrService:ToastrService,
    private commonDialogService:CommonDialogService ) {
    super();
    this.receiptResource = new VoucherResourceParameter();
    this.receiptResource.pageSize = environment.initialPageSize;
    this.pageSizeOptions = environment.pageSizeOptions
    this.receiptResource.orderBy = 'docNo asc';
  }

  ngOnInit(): void {
    this.loaderShowOrHide()
    this.createSearchForm()
    this.createFilterForm()
    this.onLoadData()

  }
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  createSearchForm(){
    this.searchForm = this.fb.group({
      branch:[''],
      device:[''],
      fromDate:['',Validators.required],
      toDate:['',Validators.required]
    })
  }
  createFilterForm():void{
    this.filterForm = this.fb.group({
      voucherDate:[''],
      voucherNo:['']
    })
  }

  setReceiptResource(formValues: any): void {
    this.receiptResource.fromDate = formValues.fromDate;
    this.receiptResource.toDate = formValues.toDate;
    this.receiptResource.device = formValues.device;
    this.receiptResource.branch = formValues.branch;
  }

  onSearch(){
    if(!this.searchForm.valid){
      this.searchForm.markAllAsTouched()
      return;
    }
    const formValues = this.searchForm.getRawValue()
    this.setReceiptResource(formValues)
    this.dataSource.loadData(this.receiptResource);
  }

  onLoadData(){
    this.dataSource = new ReceiptDataSource(this.receiptService);
    this.searchForm.valueChanges.pipe(
      skip(1), // Skip the first emission which happens on form initialization
      debounceTime(500), // Adjust the debounce time as needed
      first()).subscribe(() => {
        const formValues = this.searchForm.getRawValue();
        this.setReceiptResource(formValues)
        this.dataSource.loadData(this.receiptResource);
    });
    this.getResourceParameter();
      this.sub$.sink = this.filterForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(),skip(1))
      .subscribe(() => {
        const formValues = this.filterForm.getRawValue()
        this.receiptResource.skip = 0;
          this.receiptResource.voucherDate = formValues.voucherDate
          this.receiptResource.voucherNo = formValues.voucherNo
        this.dataSource.loadData(this.receiptResource);
      });
  }



  

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.receiptResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.receiptResource.pageSize = this.paginator.pageSize;
          this.receiptResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.receiptResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.receiptResource.pageSize = c.pageSize;
          this.receiptResource.skip = c.skip;
          this.receiptResource.totalCount = c.totalCount;
        }
      });
  }

  toggleRow(element: SalesOrder) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.cd.detectChanges();
  }

  
  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
}

deleteReceipt(voucher: IVoucher) {
  this.sub$.sink = this.commonDialogService
    .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
    .subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.sub$.sink = this.receiptService.deleteReceiptVoucher(voucher.accountVoucherUUID)
          .subscribe(() => {
            this.toastrService.success(this.translationService.getValue('Receipt Voucher Deleted Successfully'));
            this.paginator.pageIndex = 0;
            const formValues = this.filterForm.getRawValue();
            this.receiptResource.voucherDate = formValues.voucherDate;
            this.receiptResource.voucherNo = formValues.voucherNo;
            this.dataSource.loadData(this.receiptResource);
          });
      }
    });
}

removeDate():void{
  this.filterForm.get('voucherDate').reset()
}
}
