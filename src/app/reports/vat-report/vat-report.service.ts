import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsolidatedTaxCessReport } from '@core/domain-classes/consolidated-tax-cess-report.interface';
import { ITaxDetailedReport } from '@core/domain-classes/detailed-vat-report';
import { ITaxSummaryReport } from '@core/domain-classes/tax-summary-report';
import { VatReportResourceParameter } from '@core/domain-classes/vat-report-resource-parameter';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VatReportService {

  constructor(private http:HttpClient, private commonHttpErrorService:CommonHttpErrorService) { }

  getSummaryVatReport(resourceParams:VatReportResourceParameter){
    const url = 'TaxReport/VatSummaryReport'
    const customParams = new HttpParams()
    .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
    .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    .set('deviceUuid',  resourceParams.deviceUuid)
    .set('branchUuid',  resourceParams.branchUuid)
  return this.http.get<ITaxSummaryReport>(url, {params: customParams}).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getDetailedVatReport(resourceParams:VatReportResourceParameter): Observable<ITaxDetailedReport | CommonError>{
    const url = 'TaxReport/DetailedVatReport'
    const customParams = new HttpParams()
    .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
    .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    .set('deviceUuid',  resourceParams.deviceUuid)
    .set('branchUuid',  resourceParams.branchUuid)
    .set('mode',  resourceParams.mode)
  return this.http.get<ITaxDetailedReport>(url, {params: customParams}).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  getDetailedMonthlyVatReport(resourceParams:VatReportResourceParameter): Observable<ITaxDetailedReport | CommonError>{
    const url = 'TaxReport/MonthlyDetailedVatReport'
    const customParams = new HttpParams()
    .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
    .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    .set('deviceUuid',  resourceParams.deviceUuid)
    .set('branchUuid',  resourceParams.branchUuid)
    .set('mode',  resourceParams.mode)
  return this.http.get<ITaxDetailedReport>(url, {params: customParams}).pipe(catchError(this.commonHttpErrorService.handleError));
  }


  getGSTSummaryReport(resourceParams:VatReportResourceParameter):Observable<ConsolidatedTaxCessReport | CommonError>{
    const url = 'TaxReport/GSTSummaryReport'
    const customParams = new HttpParams()
    .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
    .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    .set('deviceUUID',  resourceParams.deviceUuid)
    .set('branchUUID',  resourceParams.branchUuid)
  return this.http.get<ConsolidatedTaxCessReport>(url, {params: customParams}).pipe(catchError(this.commonHttpErrorService.handleError));
  }

}

