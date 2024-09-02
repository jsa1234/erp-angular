import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleOrderDataSource } from './sale-order-datasource';
import { SaleOrderResourceParameter } from '@core/domain-classes/sale-order-resoource-parameter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BaseComponent } from 'src/app/base.component';
import { environment } from '@environments/environment';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { SaleOrderService } from '../sale-order.service';
import { ISaleOrder } from '@core/domain-classes/sale-order.interface';
import { Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, skip, tap } from 'rxjs/operators';
import { ResponseHeader } from '@core/domain-classes/response-header';

@Component({
  selector: 'app-sale-order-list',
  templateUrl: './sale-order-list.component.html',
  styleUrls: ['./sale-order-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SaleOrderListComponent extends BaseComponent implements OnInit {
  searchForm:FormGroup;
  filterForm: FormGroup;
  dataSource: SaleOrderDataSource;
  displayedColumns: string[] = ['action','orderNumber','orderStatus','orderDate','customer','total','createdUser'];
  filterColumns: string[] = ['action-search','orderNumber-search','orderStatus-search','orderDate-search','customer-search','total-search','createdUser-search' ];
  footerToDisplayed: string[] = ['footer'];
  saleOrderResource: SaleOrderResourceParameter;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSizeOptions: number[];
  isLoading$: boolean =false;
  loading$: Observable<boolean>;
  expandedElement: ISaleOrder | null;
  branchUUID: any;
  constructor(
    private fb: FormBuilder,
    private journalService: SaleOrderService,
    private cd: ChangeDetectorRef,
    public translationService: TranslationService,
    private loader:LoaderService,
    private toastrService:ToastrService,
    private commonDialogService:CommonDialogService
  ) {
    super();
    this.saleOrderResource = new SaleOrderResourceParameter();
    this.saleOrderResource.pageSize = environment.initialPageSize;
    this.pageSizeOptions = environment.pageSizeOptions

  }
  ngOnInit(): void {
    this.loaderShowOrHide()
    this.createSearchForm();
    this.createFilterForm();
    this.onLoadData();
  }
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  onLoadData() {
    this.dataSource = new SaleOrderDataSource(this.journalService);
    this.searchForm.valueChanges.pipe(
      skip(1), // Skip the first emission which happens on form initialization
      debounceTime(500), // Adjust the debounce time as needed
      first()).subscribe(() => {
        const formValues = this.searchForm.getRawValue();
        this.setSaleOrderResource(formValues)
        this.dataSource.loadData(this.saleOrderResource);
    });
    this.getResourceParameter();
    this.sub$.sink = this.filterForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(),skip(1))
      .subscribe(() => {
        const formValues = this.filterForm.getRawValue()
        this.saleOrderResource.skip = 0;
          this.saleOrderResource.docDate = formValues.docDate
          this.saleOrderResource.docNo = formValues.docNo
        this.dataSource.loadData(this.saleOrderResource);
      });
  }
  createSearchForm() {
    this.searchForm = this.fb.group({
      branch: [''],
      device: [''],
      fromDate: ['',Validators.required],
      toDate: ['',Validators.required],
    });
  }

  createFilterForm():void{
    this.filterForm = this.fb.group({
      docNo:[''],
      docDate:['']
    })
  }

  onSearch(){
    if(!this.searchForm.valid){
      this.searchForm.markAllAsTouched()
      return;
    }
    const formValues = this.searchForm.getRawValue()
    this.setSaleOrderResource(formValues)
    this.dataSource.loadData(this.saleOrderResource);
  }
  setSaleOrderResource(formValues: any): void {
    this.saleOrderResource.fromDate = formValues.fromDate;
    this.saleOrderResource.toDate = formValues.toDate;
    this.saleOrderResource.deviceUUID = formValues.device;
    this.saleOrderResource.branchUUID = formValues.branch;
  }


  ngAfterViewInit() {

    this.sub$.sink = this.paginator.page
      .pipe(
        tap((c: any) => {
          this.saleOrderResource.skip =  this.paginator.pageIndex * this.paginator.pageSize;
          this.saleOrderResource.pageSize = this.paginator.pageSize;
          this.dataSource.loadData(this.saleOrderResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.saleOrderResource.pageSize = c.pageSize;
          this.saleOrderResource.skip = c.skip;
          this.saleOrderResource.totalCount = c.totalCount;
        }
      }
    );
  }

  toggleRow(element: ISaleOrder) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.cd.detectChanges();
  }

  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
}

// deleteJournal(voucher: IJournal) {
//   this.sub$.sink = this.commonDialogService
//     .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
//     .subscribe((isTrue: boolean) => {
//       if (isTrue) {
//         this.sub$.sink = this.journalService.deleteJournal(voucher.journalUUID)
//           .subscribe(() => {
//             this.toastrService.success(this.translationService.getValue('Journal Deleted Successfully'));
//             this.paginator.pageIndex = 0;
//             const formValues = this.filterForm.getRawValue();
//             this.saleOrderResource.journalDate = formValues.journalDate;
//             this.saleOrderResource.journalNo = formValues.journalNo;
//             this.dataSource.loadData(this.saleOrderResource);
//           });
//       }
//     });
// }
removeDate():void{
  this.filterForm.get('docDate').reset()
}

}
