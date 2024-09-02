import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { SaleReturnDetailedReport } from '@core/domain-classes/report-classes/sale-return-report/sale-return-detailed-report.interface';
import { SaleReturnSummaryReport } from '@core/domain-classes/report-classes/sale-return-report/sale-return-summary-report.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleReturnReportService {

  constructor(private http:HttpClient) { }

  getBillWiseSaleReturnReport(resourceParams: ReportResourceParameter  ): Observable<SaleReturnSummaryReport> {
    const url = 'SalesReturnReport/GetSalesReturnReportsSummary';
    const customParams = new HttpParams()
    .set('deviceUUID', resourceParams.device)
    .set('clientUUID', resourceParams.customer)
    .set('branchUUID', resourceParams.branch|| '')
    .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
    .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    .set('transactionMode',resourceParams.mode)
    return this.http.get<SaleReturnSummaryReport>(url, {
      params: customParams,
    });
  }

  getDetailedSaleReturnReport(resourceParams: ReportResourceParameter  ): Observable<SaleReturnDetailedReport> {
    const url = 'SalesReturnReport/GetSalesReturnDetailReports'
    const customParams = new HttpParams()
      .set('deviceUUID', resourceParams.device)
      .set('branchUUID', resourceParams.branch|| '')
      .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
      .set('productUUID',  resourceParams.product)
      .set('clientUUID',  resourceParams.customer)
    return this.http.get<SaleReturnDetailedReport>(url, {
      params: customParams
    });
  }
}
