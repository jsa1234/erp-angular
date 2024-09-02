import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceFinancialYear } from '@core/domain-classes/device-financial-year';
import { FinancialYearPhase } from '@core/domain-classes/enums/financial-year-phase .enum';
import { FinancialYearInfo } from '@core/domain-classes/financial-year-info';
import { CurrentFinancialYearService } from '@core/services/current-financial-year.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { SettingsService } from '../../settings.service';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs/operators';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { SecurityService } from '@core/security/security.service';
import { UserAuth } from '@core/domain-classes/user-auth';

@Component({
  selector: 'app-list-year-end-process',
  templateUrl: './list-year-end-process.component.html',
  styleUrls: ['./list-year-end-process.component.scss']
})
export class ListYearEndProcessComponent extends BaseComponent implements OnInit {

  showTable: boolean = false;
  isShowFinishFinancialYear:boolean = false
  financialYearInfo: FinancialYearInfo;
  allDeviceFinancialYear: DeviceFinancialYear[];
  displayedColumns: string[] = ['#', 'code', 'deviceName','status','action'];
  yearEndProcessEnum=FinancialYearPhase
  currentFinancialYear: FinancialYearInfo;
  userAuth: UserAuth;
  constructor(
    private settingService:SettingsService,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    public translate:TranslationService,
    private router:Router,
    private currentFinancialYearService:CurrentFinancialYearService,
    private commonDialogService:CommonDialogService,
    private securityService: SecurityService,
    )
    { super() }

  ngOnInit(): void {
    this.getCurrentFinancialYear()
    // this.getCurrentLoginUser()
    this.sub$.sink = this.route.data.subscribe(
      (data:{currentFinancialYear:FinancialYearInfo})=>{
        if(data.currentFinancialYear){
          this.financialYearInfo = data.currentFinancialYear
          if(this.financialYearInfo.status==1){
            this.showTable = true
            this.getAllDeviceFinancialYear(this.financialYearInfo.financialYearUUID)
          }
        }
      }
    )
  }
  allDeviceFyClose(){
   this.sub$.sink= this.settingService.allDeviceFyClose().subscribe((res:FinancialYearInfo)=>{
      if(res){
        this.financialYearInfo=res
        this.getAllDeviceFinancialYear(this.financialYearInfo.financialYearUUID)
        this.showTable = true
      }
    },
    (err)=>{
      this.showTable = false
    })
  }

  getAllDeviceFinancialYear(financialYearUuid:string){
    this.sub$.sink=  this.settingService.getAllDeviceFinancialYear(financialYearUuid).subscribe((res:DeviceFinancialYear[])=>{
      this.allDeviceFinancialYear = res
      this.areAllStatusesSuccess()
    })
  }

  approveDeviceFinancialYearEndProcess(deviceUuid:string,financialYearUuid:string){
    const obj={
      "deviceUUID": deviceUuid,
      "financialYearUUID": financialYearUuid
    }

    this.sub$.sink= this.settingService.approveDeviceFinancialYearEndProcess(obj).subscribe((res:DeviceFinancialYear)=>{

  })

  // this.sub$.sink = this.settingService.approveDeviceFinancialYearEndProcess(obj).pipe(
  //   map((res: DeviceFinancialYear) => ({
  //     ...res,
  //     deviceUUID: deviceUuid
  //   }))
  // )
  // .subscribe(updatedDeviceFinancialYear => {
  //   const index = this.allDeviceFinancialYear.findIndex(x => x.deviceUUID === deviceUuid);
  //   if (index !== -1) {
  //     this.allDeviceFinancialYear[index] = updatedDeviceFinancialYear;
  //     // this.areAllStatusesSuccess()
  //   }
  // });


  }





getCurrentFinancialYear(){
  this.sub$.sink = this.currentFinancialYearService.currentFinancialYear$.subscribe((res:FinancialYearInfo)=>{
    this.currentFinancialYear = res
  })
}
activateNewFinancialYear(){
  this.sub$.sink = this.settingService.activateNewFinancialYear().subscribe(()=>{
    this.financialYearCloseCOnfirmation()
    this.toastr.success('Success')

  })
}


areAllStatusesSuccess() {
  return this.allDeviceFinancialYear?.length > 0 && this.allDeviceFinancialYear.every(item => item.status === this.yearEndProcessEnum.COMPLETED);

}

// getCurrentLoginUser(){
//   this.sub$.sink = this.securityService.securityObject$.subscribe((c:UserAuth)=>{
//     if(c){
//       this.userAuth = c
//     }
//   })
// }



// financialYearCloseCOnfirmation(){
//   this.onLogout()

//   const timer = 1000000000000
//   this.commonDialogService.dialogConfig.width='40%'
//   this.commonDialogService.dialogConfig.disableClose=true
//   this.commonDialogService.dialogConfig.hasBackdrop=true
//   this.commonDialogService.dialogConfig.backdropClass='dialog-background'
//   const infoMessage= this.translate.getValue('SETTINGS.YEAR_END_PROCESS.FINANCIAL_YEAR_END_LOGOUT_INFO_MESSAGE')
//   const counterMessage= this.translate.getValue('SETTINGS.YEAR_END_PROCESS.YOU_WILL_BE_AUTOMATICALLY_LOGGED_OUT_IN')
//   this.sub$.sink = this.commonDialogService.showCountdownDialog(infoMessage,counterMessage,timer).subscribe(isTrue =>{
//     if(!isTrue){ return;}
//     this.onLogout()
//   })
// }


// onLogout(): void {
//   // this.signalrService.logout(this.appUserAuth.id);
//   localStorage.clear()
//   // this.router.navigate(['/login']);
// }



financialYearCloseCOnfirmation(){
  const timer = 10
  this.commonDialogService.dialogConfig.width='40%'
  this.commonDialogService.dialogConfig.disableClose=true
  const infoMessage= this.translate.getValue('SETTINGS.YEAR_END_PROCESS.FINANCIAL_YEAR_END_LOGOUT_INFO_MESSAGE')
  const counterMessage= this.translate.getValue('SETTINGS.YEAR_END_PROCESS.YOU_WILL_BE_AUTOMATICALLY_LOGGED_OUT_IN')
  this.sub$.sink = this.commonDialogService.showCountdownDialog(infoMessage,counterMessage,timer).subscribe(isTrue =>{
    if(!isTrue){ return;}
    this.onLogout()
  })
}


onLogout(): void {
  // this.signalrService.logout(this.appUserAuth.id);
  this.securityService.logout();
  this.router.navigate(['/login']);
}

}
