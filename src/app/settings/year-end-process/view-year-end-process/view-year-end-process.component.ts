import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { SettingsService } from '../../settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialReport } from '@core/domain-classes/financial-report';
import { TranslationService } from '@core/services/translation.service';
import { FinancialYearAccount } from '@core/domain-classes/financialyear-account';
import { ToastrService } from 'ngx-toastr';
import { FYClosingDataTransmitter } from '@core/domain-classes/fy-closing-data-transmitter';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-view-year-end-process',
  templateUrl: './view-year-end-process.component.html',
  styleUrls: ['./view-year-end-process.component.scss']
})
export class ViewYearEndProcessComponent extends BaseComponent implements OnInit {
  isLoading$:boolean=false
  errorValues:any[] =[null,undefined]
  constructor(
    public translate:TranslationService, 
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    private settingService:SettingsService,
    private commonDialogService:CommonDialogService,
    private loader:LoaderService) 
    {super() }

  financialYearClosingDataList:FinancialReport
  ngOnInit() : void{
    this.loaderShowOrHide()
    this.viewFinancialYearClosingData()
    
  }
  
  viewFinancialYearClosingData():void{
    this.sub$.sink = this.route.data.subscribe(
      (data:{financialReport:FinancialReport})=>{
        if(data.financialReport){
          this.financialYearClosingDataList = data.financialReport
        }
      }
    )
  }

  loaderShowOrHide(){
    this.loader.isLoading$.subscribe(isLoading => this.isLoading$ = isLoading);
  }
  
  confirmToSave(){
    const confirmationDilogMessage = this.translate.getValue('SETTINGS.YEAR_END_PROCESS.CONFIRMATION_MESSAGE')
    this.sub$.sink = this.commonDialogService.deleteConformationDialog(confirmationDilogMessage).subscribe(isTrue =>{
      if(isTrue){
        this.save()
      }
    })

  }
  save(): void {
    this.loader.show()
    const emptyInputs = this.financialYearClosingDataList.financialYearAccounts.filter(
      (item:FinancialYearAccount) =>this.errorValues.includes(item.deviceOpeningBalance) || this.errorValues.includes(item.deviceClosingBalance)
    );
  
    if (emptyInputs.length > 0) {
      this.toastr.warning('Empty Data Are not Allowed')
      emptyInputs.forEach((item) => item.highlight = true);
      return;
    }

    const modifiedFYClosingData = new FYClosingDataTransmitter(this.financialYearClosingDataList).getModifiedData()
  
    this.sub$.sink = this.settingService.saveFinancialYearClosingData(modifiedFYClosingData).subscribe(()=>{
      this.toastr.success('Updated Succesfully')
      this.loader.hide()
      this.router.navigate(['/settings/year-end-process'])
    },
    (error)=>{
      this.loader.hide()
    })
  }

}
