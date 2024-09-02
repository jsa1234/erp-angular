import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailedReport } from '@core/domain-classes/report-classes/detailed-report';
import { SupplierWiseReport } from '@core/domain-classes/report-classes/supplier-wise-report';
import { IProductWiseReport } from '@core/domain-classes/report-classes/product-wise-report';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { Observable } from 'rxjs';
import { BillWiseReport } from '@core/domain-classes/report-classes/bill-wise-report';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReportService {
  constructor(private http:HttpClient) { }


  getProductWiseReport(
    resourceParams: ReportResourceParameter
  ): Observable<IProductWiseReport> {
    const url = 'PurchaseInvoiceReport/GetPurchaseInvoicesItemWiseReport';
    const customParams = new HttpParams()
      .set('deviceUUID', resourceParams.device)
      .set('branchUUID', resourceParams.branch|| '')
      .set('categoryUUID', resourceParams.category)
      .set('subcategoryUUID', resourceParams.subcategory)
      .set('productUUID', resourceParams.product)
      .set('brandUUID', resourceParams.brand)
      .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    return this.http.get<IProductWiseReport>(url, {
      params: customParams,
    });
  }
  gtDetailedReport(
    resourceParams: ReportResourceParameter
  ): Observable<DetailedReport> {
    const url = 'PurchaseInvoiceReport/GetPurchaseInvoicesDetailReport';
    const customParams = new HttpParams()
      .set('deviceUUID', resourceParams.device)
      .set('productUUID', resourceParams.product)
      .set('supplierUUID', resourceParams.supplier)
      .set('branchUUID', resourceParams.branch|| '')
      .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    return this.http.get<DetailedReport>(url, {
      params: customParams
    });
  }
  
  gtSupplierWiseReport(
    resourceParams: ReportResourceParameter
  ): Observable<SupplierWiseReport> {
    const url = 'PurchaseInvoiceReport/GetPurchaseInvoicesSummarySupplierWiseReport';
    const customParams = new HttpParams()
      .set('deviceUUID', resourceParams.device)
      .set('branchUUID', resourceParams.branch|| '')
      .set('supplierUUID', resourceParams.supplier)
      .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    return this.http.get<SupplierWiseReport>(url, {
      params: customParams,
    });
  }


  gtBillWiseReport(
    resourceParams: ReportResourceParameter
  ): Observable<BillWiseReport> {
    const url = 'PurchaseInvoiceReport/GetPurchaseInvoicesBillWiseSummaryReport';
    const customParams = new HttpParams()
    .set('deviceUUID', resourceParams.device)
    .set('branchUUID', resourceParams.branch|| '')
    .set('supplierUUID', resourceParams.supplier)
    .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
    .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    .set('transactionMode',resourceParams.mode)
    return this.http.get<BillWiseReport>(url, {
      params: customParams,

    });
  }

  
}
