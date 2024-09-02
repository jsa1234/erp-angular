import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { POSMerchantAccountResourceParameter } from '@core/domain-classes/pos-merchant-account-resource-parameter';
import { POSMerchantAccount } from '@core/domain-classes/pos-merchant-account.interface';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { LoaderService } from '@shared/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { PaymentMerchantService } from '../payment-merchant.service';
import { POSMerchantAccountDataSource } from './pos-merchant-account-datasource';

@Component({
  selector: 'app-payment-merchant-list',
  templateUrl: './payment-merchant-list.component.html',
  styleUrls: ['./payment-merchant-list.component.scss']
})
export class PaymentMerchantListComponent extends BaseComponent implements OnInit,AfterViewInit {
  dataSource: POSMerchantAccountDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['action', 'merchantName','merchantType','deviceCount', 'merchantIdNo','terminalIdNo' ];
  footerToDisplayed: string[] = ['footer'];
  isLoading$: boolean =false;
  posMerchantAccountResource: POSMerchantAccountResourceParameter;
  pageSizeOptions:number[] = environment.pageSizeOptions
  constructor(
    private commonDialogService:CommonDialogService, 
    private translationService:TranslationService,
    private merchantAccountService:PaymentMerchantService,
    private loader:LoaderService,
    private toastr:ToastrService) {
    super();
    this.posMerchantAccountResource = new POSMerchantAccountResourceParameter();
    this.posMerchantAccountResource.pageSize = environment.initialPageSize;
  }


  ngOnInit(): void {
    this.loaderShowOrHide();
    this.onLoadData()
  }
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  onLoadData() {
    this.dataSource = new POSMerchantAccountDataSource(this.merchantAccountService);
    this.dataSource.loadData(this.posMerchantAccountResource);
    this.getResourceParameter();
  }


  ngAfterViewInit() {
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub$.sink = merge( this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.posMerchantAccountResource.skip =
            this.paginator.pageIndex * this.paginator.pageSize;
          this.posMerchantAccountResource.pageSize = this.paginator.pageSize;
          // this.posMerchantAccountResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.posMerchantAccountResource);
        })
      )
      .subscribe();
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$.subscribe(
      (c: ResponseHeader) => {
        if (c) {
          this.posMerchantAccountResource.pageSize = c.pageSize;
          this.posMerchantAccountResource.skip = c.skip;
          this.posMerchantAccountResource.totalCount = c.totalCount;
        }
      }
    );
  }

  deleteMerchantAccount(merchantAccount: POSMerchantAccount) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.merchantAccountService.deleteMerchantAccount(merchantAccount.posMerchantUUID)
            .subscribe(() => {
              this.toastr.success(this.translationService.getValue('POS_MERCHANT_ACCOUNT_DELETED_SUCCESSFULLY'));
              this.paginator.pageIndex = 0;
              this.dataSource.loadData(this.posMerchantAccountResource);
            });
        }
      });
  }

}
