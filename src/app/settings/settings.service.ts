import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceFinancialYear } from '@core/domain-classes/device-financial-year';
import { FinancialReport } from '@core/domain-classes/financial-report';
import { FinancialYearInfo } from '@core/domain-classes/financial-year-info';
import { FinancialYearInfoResourceParameter } from '@core/domain-classes/financial-year-info-resource-parameter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http:HttpClient) { }
  allDeviceFyClose():Observable<FinancialYearInfo>{
    const url='Device/AllDeviceFYClose'
    return this.http.put<FinancialYearInfo>(url,{})
  }
  getCurrentFinancialYear():Observable<FinancialYearInfo>{
    const url='FinancialYear/GetCurrentFinancialYear'
    return this.http.get<FinancialYearInfo>(url)
  }

  getAllDeviceFinancialYear(financialYearUUid:string):Observable<DeviceFinancialYear[]>{
    const url=`FinancialYear/GetAllDeviceFinancialYear?Id=${financialYearUUid}`
    return this.http.get<DeviceFinancialYear[]>(url)
  }

  approveDeviceFinancialYearEndProcess(data:any){
    const url = 'FinancialYear/ApproveDeviceFinancialYearEndProcess'
    return this.http.put(url,data)
  }
  
  getFinancialYearClosingData(deviceUuid:string,financialYearUuid:string):Observable<FinancialReport>{
    const url = 'FinancialYear/GetFinancialYearClosingData'
    const customParams = new HttpParams()
        .set('FinancialYearUUID',financialYearUuid)
        .set('DeviceUUID',deviceUuid)
    return this.http.get<FinancialReport>(url,{params:customParams})
  }

  saveFinancialYearClosingData(data:any){
    const url = 'FinancialYear/SaveFinancialYearClosingData'
    return this.http.post(url,data)
  }

  getAllFinancialYears():Observable<FinancialYearInfo[]>{
    const url = 'FinancialYear/GetAllFinancialYears'
    return this.http.get<FinancialYearInfo[]>(url)
  }
  switchFinancialYear(FinancialInfo:FinancialYearInfoResourceParameter):Observable<FinancialYearInfo>{
    const url='FinancialYear/SwitchFinancialYear'
    return this.http.put<FinancialYearInfo>(url,FinancialInfo)
  }
  activateNewFinancialYear(){
    const url='FinancialYear/ActivateNewFinancialYear'
    return this.http.put(url,{})
  }
}
