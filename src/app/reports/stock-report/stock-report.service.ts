import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralStockReport } from '@core/domain-classes/report-classes/stock-report/general-report';
import { StockItemReport } from '@core/domain-classes/report-classes/stock-report/stock-item-report';
import { StockReportResourceParameter } from '@core/domain-classes/report-classes/stock-report/stock-report-resource-parameter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockReportService {

  constructor(private http:HttpClient) { }

  getGeneralReport(
    resourceParams:StockReportResourceParameter
  ): Observable<GeneralStockReport> {
    const url = 'StockReport/GetGeneralStockReport';
    const customParams = new HttpParams()
      .set('deviceUUID', resourceParams.device)
      .set('branchUUID', resourceParams.branch)
      .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    return this.http.get<GeneralStockReport>(url, {
      params: customParams
    });
  }

  getProductWiseReport(
    resourceParams:StockReportResourceParameter
  ): Observable<StockItemReport> {
    const url = 'StockReport/GetStockItemReport';
    const customParams = new HttpParams()
      .set('deviceUUID', resourceParams.device)
      .set('branchUUID', resourceParams.branch)
      .set('categoryUUID', resourceParams.category)
      .set('subcategoryUUID', resourceParams.subcategory)
      .set('productUUID', resourceParams.product)
      .set('brandUUID', resourceParams.brand)
      .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    return this.http.get<StockItemReport>(url, {
      params: customParams,
    });
  }
}
