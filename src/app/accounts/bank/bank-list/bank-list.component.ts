import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from 'src/app/base.component';
import { BankDataSource } from './bank-datasource';
import { BankResourceParameter } from '@core/domain-classes/bank-resource-parameter';
import { environment } from '@environments/environment';
import { MatSort } from '@angular/material/sort';
import { BankService } from '../bank.service';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { LoaderService } from '@shared/services/loader.service';
import { Bank } from '@core/domain-classes/bank.interface';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent extends BaseComponent implements OnInit ,AfterViewInit {
  displayedColumns: string[] = [ 'accountHeadCode', 'bankName', 'branch','accountHolder','accountNo','ifscCode','action'];
  footerToDisplayed: string[] = ['footer'];
  dataSource: BankDataSource;
  bankResource: BankResourceParameter;
  pageSizeOptions:number[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoading$: boolean;

  constructor(
    private bankService:BankService,
    private loader:LoaderService, 
    private commonDialogService:CommonDialogService, 
    private transalte:TranslationService,
    private toastr:ToastrService,
    private branchService:BranchService
  ) {
    super();
    this.bankResource = new BankResourceParameter();
    this.bankResource.pageSize = environment.initialPageSize;
    this.pageSizeOptions = environment.pageSizeOptions
  }

  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.loaderShowOrHide()
    this.onLoadData()
  }

  onLoadData() {
    this.dataSource = new BankDataSource(this.bankService);
    this.dataSource.loadData(this.bankResource);
    this.getResourceParameter();
    
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.bankResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.bankResource.pageSize = this.paginator.pageSize;
          this.bankResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.bankResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.bankResource.pageSize = c.pageSize;
          this.bankResource.skip = c.skip;
          this.bankResource.totalCount = c.totalCount;
        }
      }
    );
  }


  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }


  deleteBank(item:Bank){
    this.sub$.sink = this.commonDialogService
    .deleteConformationDialog(`${this.transalte.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${item.nameEnglish} - ${item.namePrefixEnglish}`)
    .subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.sub$.sink = this.bankService.deleteBank(item.accountUUID)
          .subscribe(() => {
            this.toastr.success(this.transalte.getValue('BANK_DELETED_SUCCESSFULLY'));
            this.paginator.pageIndex = 0;
            this.dataSource.loadData(this.bankResource);
          });
      }
    });
  }
}

