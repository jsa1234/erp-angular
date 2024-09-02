import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { PaymentTransactionService } from '../payment-transaction.service';
import { PaymentTransactionsResourceParameter } from '@core/domain-classes/payment-transactions.resource.parameter';
import { PaymentTransactionsDataSource } from './payment-transactions.datasource';
import { environment } from '@environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '@core/services/translation.service';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { debounceTime, first, skip, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { IPaymentTransactions } from '@core/domain-classes/payment-transactions.interface';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from '@core/security/security.service';

@Component({
  selector: 'app-payment-transactions-list',
  templateUrl: './payment-transactions-list.component.html',
  styleUrls: ['./payment-transactions-list.component.scss']
})
export class PaymentTransactionsListComponent extends BaseComponent implements OnInit {
  resourceParams:PaymentTransactionsResourceParameter;
  dataSource:PaymentTransactionsDataSource;
  displayedColumns:string[]=['action','transactionDate','transactionNo','transactionAmount','trasactionDocumentNo','transactionMode','transactionStatus','transactionSignature']
  displayedSearchColumns:string[] = []
  footerColumn:string[] = ['footer']
  pageSizeOptions:number[];
  initialPageSize:number;
  searchForm: FormGroup;
  financialYearUUID:string
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  branchUUID: string;
  constructor(
    private payementTransactionService:PaymentTransactionService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    securityService:SecurityService,
    private commonDialogService:CommonDialogService,
    public translate:TranslationService) {
    super();
    this.pageSizeOptions = environment.pageSizeOptions;
    this.initialPageSize = environment.initialPageSize;
    this.financialYearUUID =  securityService?.getUserDetail()?.financialYear?.financialYearUUID
    this.resourceParams = new PaymentTransactionsResourceParameter();
    this.resourceParams.pageSize = this.initialPageSize;
    this.resourceParams.orderBy = 'transactionDate asc';

  }

  ngOnInit(): void {
    this.createSearchForm()
    this.loadData()
  }

  loadData():void{
    this.dataSource = new PaymentTransactionsDataSource(this.payementTransactionService);
    this.searchForm.valueChanges
    .pipe(
      skip(1), // Skip the first emission which happens on form initialization
      debounceTime(500), // Adjust the debounce time as needed
      first()
    )
    .subscribe(() => {
      const formValues = this.searchForm.getRawValue()

      this.setPaymentTransactionResource(formValues);
      this.dataSource.loadData(this.resourceParams);
    });
    this.getResourceParameter();
  }
  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeader$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.resourceParams.pageSize = c.pageSize;
          this.resourceParams.skip = c.skip;
          this.resourceParams.totalCount = c.totalCount;
        }
      });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.resourceParams.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.resourceParams.pageSize = this.paginator.pageSize;
          this.resourceParams.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.resourceParams);
        })
      )
      .subscribe();
  }

  deletePaymentTransaction(pt:IPaymentTransactions):void{
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translate.getValue('COMMON.ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${pt.transactionNo}`)
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.payementTransactionService.deletePaymentTransaction(pt.paymentTransactionUUID)
            .subscribe(() => {
              this.toastr.success(this.translate.getValue('PAYMENT_TRANSACTION_DELETED_SUCCESSFULLY'));
              this.paginator.pageIndex = 0;
              this.dataSource.loadData(this.resourceParams);
            });
        }
      });
  }


  createSearchForm() {
    this.searchForm = this.fb.group({
      branchUUID:[''],
      deviceUUID: [''],
      fromDate:['',Validators.required],
      toDate :['',Validators.required],
      financialYearUUID:[this.financialYearUUID]
    });
  }

  onSearchSubmit() {
    if (this.searchForm.invalid) { 
      this.searchForm.markAllAsTouched();
      return; }

    const formValues = this.searchForm.getRawValue();
    this.setPaymentTransactionResource(formValues);
    this.dataSource.loadData(this.resourceParams);
  }


  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      deviceUUID:''
    })
}
setPaymentTransactionResource(formValues: any): void {
  this.resourceParams.fromDate = formValues.fromDate;
  this.resourceParams.toDate = formValues.toDate;
  this.resourceParams.deviceUUID = formValues.deviceUUID;
  this.resourceParams.branchUUID = formValues.branchUUID;
  this.resourceParams.financialYearUUID = formValues.financialYearUUID
}

}
