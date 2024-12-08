import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { IVoucher } from '@core/domain-classes/voucher';
import { VoucherResourceParameter } from '@core/domain-classes/voucher-resource-parameter';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, skip, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { VoucherService } from '../voucher.service';
import { VoucherDataSource } from './voucher.datasource';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VoucherListComponent extends BaseComponent implements OnInit {
  dataSource: VoucherDataSource;
  searchForm:FormGroup
  displayedColumns: string[] = [ 'docNo', 'docDate', 'Amount','User','action'];
  filterColumns: string[] = ['ReceptNo-search','ReceptDate-search','Amount-search',  'User-search','action-search'];
  footerToDisplayed: string[] = ['footer'];
  voucherResource: VoucherResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  expandedElement: IVoucher | null;
  isLoading$: boolean =false;
  branchUUID: string;
  filterForm: FormGroup;


  constructor(
    private voucherService: VoucherService,
    private cd: ChangeDetectorRef,
    private fb:FormBuilder,
    public translationService: TranslationService,
    private loader:LoaderService,
    private toastrService:ToastrService,
    private commonDialogService:CommonDialogService,
    private branchService:BranchService
  ) { 
    super();
    this.voucherResource = new VoucherResourceParameter();
    this.voucherResource.pageSize = 50;
    this.voucherResource.orderBy = 'docNo asc';

  }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.loaderShowOrHide()
    this.createSearchForm()
    this.createFilterForm()
    this.onLoadData()
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

  setVoucherResource(formValues: any): void {
    this.voucherResource.fromDate = formValues.fromDate;
    this.voucherResource.toDate = formValues.toDate;
    this.voucherResource.device = formValues.device;
    this.voucherResource.branch = formValues.branch;
  }
  
  onSearch(){
    if(!this.searchForm.valid) {
      this.searchForm.markAllAsTouched()
      return;
    }
    const formValues = this.searchForm.getRawValue()
      this.setVoucherResource(formValues)
      this.dataSource.loadData(this.voucherResource);
  }


  onLoadData(){
    this.dataSource = new VoucherDataSource(this.voucherService);
    this.searchForm.valueChanges.pipe(
      skip(1), // Skip the first emission which happens on form initialization
      debounceTime(500), // Adjust the debounce time as needed
      first()).subscribe(() => {
        const formValues = this.searchForm.getRawValue()
        this.setVoucherResource(formValues)
        this.dataSource.loadData(this.voucherResource);
    });
    this.getResourceParameter();
    this.sub$.sink = this.filterForm.valueChanges
    .pipe(debounceTime(500), distinctUntilChanged(),skip(1))
    .subscribe(() => {
      const formValues = this.filterForm.getRawValue()
      this.voucherResource.skip = 0;
        this.voucherResource.voucherDate = formValues.voucherDate
        this.voucherResource.voucherNo = formValues.voucherNo
      this.dataSource.loadData(this.voucherResource);
    });
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.voucherResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.voucherResource.pageSize = this.paginator.pageSize;
          this.voucherResource.orderBy = `${this.sort.active} ${this.sort.direction}`;
          this.dataSource.loadData(this.voucherResource);
        })
      )
      .subscribe();
  }


  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.voucherResource.pageSize = c.pageSize;
          this.voucherResource.skip = c.skip;
          this.voucherResource.totalCount = c.totalCount;
        }
      });
  }

  toggleRow(element: IVoucher) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.cd.detectChanges();
  }

  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
}

deleteVoucher(voucher: IVoucher) {
  this.sub$.sink = this.commonDialogService
    .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
    .subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.sub$.sink = this.voucherService.deletePaymentVoucher(voucher.accountVoucherUUID)
          .subscribe(() => {
            this.toastrService.success(this.translationService.getValue('Payment Voucher Deleted Successfully'));
            this.paginator.pageIndex = 0;
            const formValues = this.filterForm.getRawValue();
            this.voucherResource.voucherDate = formValues.voucherDate;
            this.voucherResource.voucherNo = formValues.voucherNo;
            this.dataSource.loadData(this.voucherResource);
          });
      }
    });
}
removeDate(){
  this.filterForm.get('voucherDate').setValue('')
}

}
