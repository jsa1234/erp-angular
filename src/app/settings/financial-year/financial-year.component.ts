import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { SettingsService } from '../settings.service';
import { FinancialYearInfo } from '@core/domain-classes/financial-year-info';
import { TranslationService } from '@core/services/translation.service';
import { LoaderService } from '@shared/services/loader.service';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { SecurityService } from '@core/security/security.service';
import { UserAuth } from '@core/domain-classes/user-auth';
import { FinancialYearInfoResourceParameter } from '@core/domain-classes/financial-year-info-resource-parameter';
import { CurrentFinancialYearService } from '@core/services/current-financial-year.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-financial-year',
  templateUrl: './financial-year.component.html',
  styleUrls: ['./financial-year.component.scss']
})
export class FinancialYearComponent extends BaseComponent implements OnInit {
  financialYearDataList:FinancialYearInfo[];
  isLoading$:boolean
  loggedUser: UserAuth;
  financialYearInfoResourceParameter:FinancialYearInfoResourceParameter 
  currentFinancialYearUuid: string;
  constructor(
    private settingService :SettingsService, 
    public translate:TranslationService,
    private loader:LoaderService,
    private commonDialogService:CommonDialogService,
    private securityService:SecurityService,
    private currentFinancialYearService:CurrentFinancialYearService,
    private router:Router,
    private toastrService:ToastrService
    ) 
    {super()
      this.financialYearInfoResourceParameter = new FinancialYearInfoResourceParameter()}

  ngOnInit(): void {
    this.loaderShowOrHide()
    this.getLoggedUser()
    this.getAllFinancialYears()
    this.getCurrentFinancialYear()
  }
  getCurrentFinancialYear() {
    this.sub$.sink = this.currentFinancialYearService.currentFinancialYear$.subscribe((res:FinancialYearInfo)=>{
      this.currentFinancialYearUuid = res.financialYearUUID
    })
  }
  getAllFinancialYears():void{
    this.loader.show()
    this.sub$.sink = this.settingService.getAllFinancialYears().subscribe((res:FinancialYearInfo[])=>{
      this.financialYearDataList = res
      this.loader.hide()
    })

  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }

  switchFY(financialYearUUID:string){
    const confirmationDilogMessage = this.translate.getValue('SETTINGS.FINANCIAL_YEAR.SWITCH_FY')
    this.commonDialogService.dialogConfig.width='50%'
    this.sub$.sink = this.commonDialogService.deleteConformationDialog(confirmationDilogMessage).subscribe(isTrue =>{
      if(!isTrue){ return;}
      this.loader.show()
      this.financialYearInfoResourceParameter.financialYearUUID=financialYearUUID,
      this.financialYearInfoResourceParameter.userUUID=this.loggedUser?.id
        this.settingService.switchFinancialYear(this.financialYearInfoResourceParameter).subscribe((res:FinancialYearInfo)=>{
          this.currentFinancialYearService.setFinancialYear(res)
          this.loader.hide()
          this.toastrService.success('Financial Year Switching Successfully')
          this.router.navigate(['/'])
        })
      
    })
  }

  getLoggedUser(){
    this.sub$.sink = this.securityService.securityObject$.subscribe((res:UserAuth)=>{
      this.loggedUser =res
    })
  }
}


