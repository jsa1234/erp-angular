import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { DailyActivityReportResourceParameter } from '@core/domain-classes/report-classes/daily-activity-report/daily-activity-report-resource-parameter.class';
import { Observable } from 'rxjs';
import { DailyActivityReport } from '@core/domain-classes/report-classes/daily-activity-report/daily-activity-report.class';


@Injectable({providedIn: 'root'})
export class DailyActivityReportService {
  constructor(private httpClient: HttpClient) {}
   
   getDailyActivityReport(resourceParams:DailyActivityReportResourceParameter):Observable<DailyActivityReport>{
    const url = 'DailyReport/GetDailyReportWithDate';
    const customParams = new HttpParams()
      .set('DeviceUUID', resourceParams?.device)
      .set('BranchUUID', resourceParams?.branch)
      .set('Date',resourceParams.date? resourceParams?.date.toDateString():'')
    return this.httpClient.get<DailyActivityReport>(url,{
      params:customParams
    })
   }

}
