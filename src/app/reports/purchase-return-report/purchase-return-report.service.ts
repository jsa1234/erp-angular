import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { PurchaseReturnDetailReport } from '@core/domain-classes/report-classes/purchase-return-report/purchase-return-detailed-report.interface';
import { PurchaseReturnSummaryReport } from '@core/domain-classes/report-classes/purchase-return-report/purchase-return-summary.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReturnReportService {

  constructor(private http:HttpClient) { }

  getBillwisePurchaseReturnReport(resourceParams:ReportResourceParameter):Observable<PurchaseReturnSummaryReport>{
    const url = 'PurchaseReturnReport/GetPurchaseReturnBillWiseSummaryReport';
    const customParams = new HttpParams()
    .set('deviceUUID', resourceParams.device)
    .set('branchUUID', resourceParams.branch)
    .set('supplierUUID', resourceParams.supplier)
    .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
    .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    .set('transactionMode',resourceParams.mode)
    return this.http.get<PurchaseReturnSummaryReport>(url,{params:customParams})
  }

  getDetailPurchaseReturnReport(
    resourceParams: ReportResourceParameter
  ): Observable<PurchaseReturnDetailReport> {
    const url = 'PurchaseReturnReport/GetPurchaseReturnDetailReport';
    const customParams = new HttpParams()
      .set('deviceUUID', resourceParams.device)
      .set('productUUID', resourceParams.product)
      .set('supplierUUID', resourceParams.supplier)
      .set('branchUUID', resourceParams.branch)
      .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    return this.http.get<PurchaseReturnDetailReport>(url, {
      params: customParams
    });
  }
}
