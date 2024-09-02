import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductWiseSalesReport } from '@core/domain-classes/report-classes/sales-report/product-wise-sales-report';
import { DetailedSalesReport } from '@core/domain-classes/report-classes/sales-report/detailed-sales-report';
import { CustomerWiseSalesReport } from '@core/domain-classes/report-classes/sales-report/customer-wise-sales-report';
import { BillWiseSalesReport } from '@core/domain-classes/report-classes/sales-report/bill-wise-sales-report';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesReportService {

  constructor(private http:HttpClient) { }
  getProductWiseSalesReport(resourceParams:ReportResourceParameter):Observable<ProductWiseSalesReport>
  {
    const url = 'SalesInvoiceReport/GetSalesInvoiceItemReports'
    const customParams = new HttpParams()
    .set('deviceUUID', resourceParams.device)
    .set('branchUUID', resourceParams.branch|| '')
    .set('productCategoryUUID', resourceParams.category)
    .set('productSubcategoryUUID', resourceParams.subcategory)
    .set('productUUID', resourceParams.product)
    .set('brandUUID', resourceParams.brand)
    .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
    .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
  return this.http.get<ProductWiseSalesReport>(url, {
    params: customParams,
  });
  }



  getDetailedSalesReport(
    resourceParams: ReportResourceParameter
  ): Observable<DetailedSalesReport> {
    const url = 'SalesInvoiceReport/GetSalesInvoiceDetailReport'
    const customParams = new HttpParams()
      .set('deviceUUID', resourceParams.device)
      .set('branchUUID', resourceParams.branch|| '')
      .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
      .set('productUUID',  resourceParams.product)
      .set('clientUUID',  resourceParams.customer)
    return this.http.get<DetailedSalesReport>(url, {
      params: customParams
    });
  }
  
  getCustomerWiseSalesReport(
    resourceParams: ReportResourceParameter
  ): Observable<CustomerWiseSalesReport> {
    const url = 'SalesInvoiceReport/GetSalesSummaryReportByClient';
    const customParams = new HttpParams()
      .set('deviceUUID', resourceParams.device)
      .set('branchUUID', resourceParams.branch|| '')
      .set('clientUUID', resourceParams.customer)
      .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
      .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    return this.http.get<CustomerWiseSalesReport>(url, {
      params: customParams,
    });
  }


  getBillWiseSalesReport(
    resourceParams: ReportResourceParameter
  ): Observable<BillWiseSalesReport> {
    const url = 'SalesInvoiceReport/GetSalesInvoiceReports';
    const customParams = new HttpParams()
    .set('deviceUUID', resourceParams.device)
    .set('clientUUID', resourceParams.customer)
    .set('branchUUID', resourceParams.branch|| '')
    .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
    .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    .set('transactionMode',resourceParams.mode)
    return this.http.get<BillWiseSalesReport>(url, {
      params: customParams,
    });
  }
}
