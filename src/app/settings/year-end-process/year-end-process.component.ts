import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceFinancialYear } from '@core/domain-classes/device-financial-year';
import { FinancialYearPhase } from '@core/domain-classes/enums/financial-year-phase .enum';
import { FinancialYearInfo } from '@core/domain-classes/financial-year-info';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { SettingsService } from '../settings.service';
import { CurrentFinancialYearService } from '@core/services/current-financial-year.service';

@Component({
  selector: 'app-year-end-process',
  templateUrl: './year-end-process.component.html',
  styleUrls: ['./year-end-process.component.scss']
})
export class YearEndProcessComponent extends BaseComponent implements OnInit {
  // showTable: boolean = false;
  // financialYearInfo: FinancialYearInfo;
  // allDeviceFinancialYear: DeviceFinancialYear[];
  // displayedColumns: string[] = ['#', 'code', 'deviceName','status','action'];
  // yearEndProcessEnum=FinancialYearPhase
  // currentFinancialYear: FinancialYearInfo;
  constructor(
    // private settingService:SettingsService, 
    // private route:ActivatedRoute,
    // private router:Router,
    // public translate:TranslationService,
    // private currentFinancialYearService:CurrentFinancialYearService
    ) 
    { 
      super() 
    }

  ngOnInit(): void {
    // this.getCurrentFinancialYear()
    // this.sub$.sink = this.route.data.subscribe(
    //   (data:{currentFinancialYear:FinancialYearInfo})=>{
    //     if(data.currentFinancialYear){
    //       this.financialYearInfo = data.currentFinancialYear
    //       if(this.financialYearInfo.status==1){
    //         this.showTable = true
    //         this.getAllDeviceFinancialYear(this.financialYearInfo.financialYearUUID)
    //       }
    //     }
    //   }
    // )
  }
//   allDeviceFyClose(){
//    this.sub$.sink= this.settingService.allDeviceFyClose().subscribe((res:FinancialYearInfo)=>{
//       if(res){
//         this.financialYearInfo=res
//         this.getAllDeviceFinancialYear(this.financialYearInfo.financialYearUUID)
//         this.showTable = true
//       }
//     },
//     (err)=>{
//       this.showTable = false
//     })
//   }

//   getAllDeviceFinancialYear(financialYearUuid:string){
//     this.sub$.sink=  this.settingService.getAllDeviceFinancialYear(financialYearUuid).subscribe((res:DeviceFinancialYear[])=>{
//       this.allDeviceFinancialYear = res
//     })
//   }

//   approveDeviceFinancialYearEndProcess(deviceUuid:string,financialYearUuid:string){
//     const obj={
//       "deviceUUID": deviceUuid,
//       "financialYearUUID": financialYearUuid
//     }

//     this.sub$.sink= this.settingService.approveDeviceFinancialYearEndProcess(obj).subscribe((res:DeviceFinancialYear)=>{
      
//   })

//   }

//   isViewRoute(): boolean {
//     return this.router.url.includes('/settings/year-end-process/view');
//   }


// getCurrentFinancialYear(){
//   this.sub$.sink = this.currentFinancialYearService.currentFinancialYear$.subscribe((res:FinancialYearInfo)=>{
//     this.currentFinancialYear = res
//   })
// }

}
