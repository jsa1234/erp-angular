import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountOpeningBalanceResourceParameter } from '@core/domain-classes/account-opening-balance-resource-parameter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AccountOpeningBalanceService } from '../account-opening-balance.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { environment } from '@environments/environment';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { SecurityService } from '@core/security/security.service';
import { AccountOpeningBalance } from '@core/domain-classes/accoun-opening-balance.interface';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '@shared/services/loader.service';
import { BranchService } from 'src/app/branch/branch.service';

@Component({
  selector: 'app-account-opening-balance-list',
  templateUrl: './account-opening-balance-list.component.html',
  styleUrls: ['./account-opening-balance-list.component.scss']
})
export class AccountOpeningBalanceListComponent extends BaseComponent implements OnInit {
  searchForm:FormGroup;
  accountHeadResource: AccountOpeningBalanceResourceParameter;
  isLoading$:boolean;
  accountOpeningBalanceList:AccountOpeningBalance[] = []
  financialYearUUID: string;
  constructor(
    private accountOpeningBalanceService: AccountOpeningBalanceService,
    private securityService: SecurityService,
    private toastrService: ToastrService,
    private loader:LoaderService,
    private fb:FormBuilder,
    public translationService: TranslationService,
    private branchService:BranchService

  ) { 
    super();
    this.accountHeadResource = new AccountOpeningBalanceResourceParameter();
    this.financialYearUUID = this.securityService.getUserDetail().financialYear.financialYearUUID
  }
  ngOnInit(): void {
    this.branchService.isHeadOfficeSubject$.next(true);
    this.loaderShowOrHide()
    this.createSearchForm()
  }

  createSearchForm(){
    this.searchForm = this.fb.group({
      branchUUID:['',Validators.required],
      financialYearUUID:[this.financialYearUUID],
      accountUUID:['']
    })
  }
  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  getOpeningBalance() {
    if(this.searchForm.invalid){
      this.searchForm.markAllAsTouched();
      return;
    }
    this.loader.show()
    this.accountHeadResource = this.searchForm.getRawValue()
    this.accountOpeningBalanceList = []
    this.sub$.sink = this.accountOpeningBalanceService.getOpeningBalance(this.accountHeadResource).subscribe((res: AccountOpeningBalance[]) => {
        this.accountOpeningBalanceList = res
        this.loader.hide();
    }, 
    ()=>{
      this.toastrService.error('Something Went Wrong, Try Again Later');
      this.loader.hide();
    })
  }


  updateOpeningBalance(){
    this.loader.show()
    this.sub$.sink  = this.accountOpeningBalanceService.updateAccountOpeningBalance(this.accountOpeningBalanceList, this.accountHeadResource.branchUUID).subscribe((res:AccountOpeningBalance)=>{
      this.toastrService.success('Opening Balance Updated successfully')
      this.clear()
      this.loader.hide()
    },
    ()=>{
      this.toastrService.error('Something Went Wrong, Try Again Later');
      this.loader.hide()
    })
  }

  clear(){
   // this.searchForm.get('branchUUID').reset()
    this.accountOpeningBalanceList = []
    this.accountHeadResource = new AccountOpeningBalanceResourceParameter()
  }
}
