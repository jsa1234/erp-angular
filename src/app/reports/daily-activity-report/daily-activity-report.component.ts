import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyActivityReportResourceParameter } from '@core/domain-classes/report-classes/daily-activity-report/daily-activity-report-resource-parameter.class';
import { DailyActivityReport } from '@core/domain-classes/report-classes/daily-activity-report/daily-activity-report.class';
import { ClonerService } from '@core/services/clone.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DailyActivityReportService } from './daily-activity-report.service';
import { environment } from '@environments/environment';
@Component({
  selector: 'app-daily-activity-report',
  templateUrl: './daily-activity-report.component.html',
  styleUrls: ['./daily-activity-report.component.scss'],
})
export class DailyActivityReportComponent extends BaseComponent implements OnInit {
searchForm:FormGroup
searchParameter:DailyActivityReportResourceParameter
dailyActivityReportDetail:DailyActivityReport
dailyActivityReportDetailPdf:DailyActivityReport
isloading:boolean = false
  branchUUID: any;
  constructor(
    private dailyActivityReportService:DailyActivityReportService,
    private fb:FormBuilder,
    private clonerService:ClonerService,
    public translationService:TranslationService) {
    super();
    
  }

 
  ngOnInit(): void {
   this.createSearchForm()
  }
createSearchForm(){
  this.searchForm = this.fb.group({
    device:[''],
    branch:[''],
    date:['',Validators.required]
  })
}
onSearch(){
  if(this.searchForm.invalid){
    this.searchForm.markAllAsTouched();
    return;
  }
  this.searchParameter = this.searchForm.value
  this.isloading = true
      this.sub$.sink = this.dailyActivityReportService.getDailyActivityReport(this.searchParameter).subscribe((res:DailyActivityReport)=>{
        this.dailyActivityReportDetail = res
        this.isloading = false
    })
}
  generatePDF(){
    this.dailyActivityReportDetailPdf = this.clonerService.deepClone<DailyActivityReport>( this.dailyActivityReportDetail)
  }

  clear(){
    this.searchForm.patchValue({
      device:'',
      date:''
    })
    this.searchForm.markAsUntouched()
    this.dailyActivityReportDetail = null
  }
  parentBranchHandlerFunction(valueEmitted){
    this.branchUUID = valueEmitted;
    this.searchForm.patchValue({
      device:''
    })
}
}
