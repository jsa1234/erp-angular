import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { IStockTransfer } from '@core/domain-classes/stock-transfe.interface';
import { StockTransferResourceParameter } from '@core/domain-classes/stock-trasfer-resource-parameter';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, skip, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../../inventory.service';
import { StockTransferDataSource } from './stock-transfer-datasource';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '@shared/services/loader.service';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-stock-transfer-list',
  templateUrl: './stock-transfer-list.component.html',
  styleUrls: ['./stock-transfer-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StockTransferListComponent extends BaseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: StockTransferDataSource;
  stockTransferResource: StockTransferResourceParameter;
  searchForm: FormGroup;
  branchUUID:string = '';
  defaultPageSize:number = environment.initialPageSize
  pageSizeOptions:number[] = environment.pageSizeOptions
  public filterObservable$: Subject<string> = new Subject<string>();
  _docDateFilter: string;
  _docNoFilter: string;
  expandedElement: IStockTransfer | null;

  displayedColumns: string[] = [ 'docDate', 'docNo','refInvDate','refInvNo','sourceBranch','destinationBranch','action'];
  filterColumns: string[] = ['action-search', 'docDate-search', 'docNo-search','refInvDate-search','refInvNo-search','sourceBranch-search','destinationBranch-search'];
  footerToDisplayed: string[] = ['footer'];
  isLoading$: any;

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



  constructor(public translate:TranslationService,
    private fb: FormBuilder,    
    private stockTransferService: InventoryService,
    private router:Router,
    private cd: ChangeDetectorRef,
    private commonDialogService:CommonDialogService,
    private loader:LoaderService,
    private toastrService:ToastrService,
    private branchService:BranchService
  ) {
    super()
    this.stockTransferResource = new StockTransferResourceParameter();
    this.stockTransferResource.pageSize = this.defaultPageSize;
    this.stockTransferResource.orderBy = 'docNo asc';
   }

  ngOnInit(): void {
    this.createSearchForm();
    this.onLoadData();
    this.loaderShowOrHide();
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      // branchUUID:[''],
      // deviceUUID: [''],
      fromDate:['',Validators.required],
      toDate :['',Validators.required]
    });
  }
//   parentBranchHandlerFunction(valueEmitted){
//     this.branchUUID = valueEmitted;
//     this.searchForm.patchValue({
//       deviceUUID:''
//     })
// }
setStockTransferResource(formValues: any): void {
  this.stockTransferResource.fromDate = formValues.fromDate;
  this.stockTransferResource.toDate = formValues.toDate;
  // this.stockTransferResource.device = formValues.device;
  // this.stockTransferResource.branch = formValues.branch;
}
loaderShowOrHide(){
  this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
}


onLoadData()
{
  this.dataSource = new StockTransferDataSource(this.stockTransferService);
  this.searchForm.valueChanges.pipe(
    skip(1), // Skip the first emission which happens on form initialization
    debounceTime(500), // Adjust the debounce time as needed
    first()).subscribe(() => {
      const formValues = this.searchForm.getRawValue()

      this.setStockTransferResource(formValues)
  this.dataSource.loadData(this.stockTransferResource);
      
  });
  this.getResourceParameter();
  this.sub$.sink = this.filterObservable$
    .pipe(
      debounceTime(1000),
      distinctUntilChanged())
    .subscribe((c) => {
      this.stockTransferResource.skip = 0;
      const strArray: Array<string> = c.split(':');
      if (strArray[0] === 'docDate') {
        this.stockTransferResource.docDate =new Date(strArray[1]);
        if(isNaN(this.stockTransferResource.docDate.getTime()))
            {
              this.stockTransferResource.docDate = null;
            }
      } else if (strArray[0] === 'docNo') {
        this.stockTransferResource.docNo = strArray[1];
      }
      this.dataSource.loadData(this.stockTransferResource);
    });
    this.branchService.isHeadOfficeSubject$.next(true);
}

ngAfterViewInit() {
  this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap((c: any) => {
        this.stockTransferResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
        this.stockTransferResource.pageSize = this.paginator.pageSize;
        this.stockTransferResource.orderBy = this.sort.active + ' ' + this.sort.direction;
        this.dataSource.loadData(this.stockTransferResource);
      })
    )
    .subscribe();
}

getResourceParameter() {
  this.sub$.sink = this.dataSource.responseHeaderSubject$
    .subscribe((c: ResponseHeader) => {
      if (c) {
        this.stockTransferResource.pageSize = c.pageSize;
        this.stockTransferResource.skip = c.skip;
        this.stockTransferResource.totalCount = c.totalCount;
      }
    });
}

toggleRow(element: IStockTransfer) {
  this.expandedElement = this.expandedElement === element ? null : element;
  this.cd.detectChanges();
}

deleteStockTransfer(stockTransfer: IStockTransfer) {
  this.sub$.sink = this.commonDialogService
    .deleteConformationDialog(`${this.translate.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${stockTransfer.docNo}`)
    .subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.sub$.sink = this.stockTransferService.deleteStockTransfer(stockTransfer.stockTransferUUID)
          .subscribe(() => {
            this.toastrService.success(this.translate.getValue('STOCK_TRANSFER_DELETED_SUCCESSFULLY'));
            this.paginator.pageIndex = 0;
            this.dataSource.loadData(this.stockTransferResource);
          });
      }
    });
}
editStockTransfer(id: string) {
  this.router.navigate(['/inventory/stock-transfer/manage/', id])
}


onSearchSubmit() {
  if (this.searchForm.invalid) { 
    this.searchForm.markAllAsTouched();
    return; }
    const formValues = this.searchForm.getRawValue()
    this.setStockTransferResource(formValues)
      this.dataSource.loadData(this.stockTransferResource);
}

}
