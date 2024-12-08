import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleReturnDetail } from '@core/domain-classes/sale-return-detail';
import { ISalesInvoice } from '@core/domain-classes/sales-invoice';
import { SalesInvoiceDetails } from '@core/domain-classes/sales-invoiceDetail';
import { SalesInvoiceResourceParameter } from '@core/domain-classes/sales-resourceParameter';
import { SalesReturn } from '@core/domain-classes/sales-return';
import { SalesReturnResourceParameter } from '@core/domain-classes/sales-return-resource-parameter';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(
    private http: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }

  //#region SalesInvoice
  getAllSalesInvoice(
    resourceParams: SalesInvoiceResourceParameter
  ): Observable<HttpResponse<ISalesInvoice[]>> {
    const url = 'salesInvoice';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('docNo', resourceParams.docNo)
      .set('docDate',resourceParams.docDate ?resourceParams.docDate.toDateString() : '')
      .set('fromDate', resourceParams.fromDate ? resourceParams.fromDate.toDateString() : '')
      .set('toDate', resourceParams.toDate ? resourceParams.toDate.toDateString() : '')
      .set('branchUUID', resourceParams.branchUUID ? resourceParams.branchUUID : '')
      .set('deviceUUID', resourceParams.deviceUUID ? resourceParams.deviceUUID: '')
    return this.http.get<ISalesInvoice[]>(url, {
      params: customParams,
      observe: 'response'
    });
  }


  getSalesInvoiceById(salesOrderId: string): Observable<ISalesInvoice> {
    const url = `salesInvoice/${salesOrderId}`;
    return this.http.get<ISalesInvoice>(url);
  }


  getSalesInvoiceDetail(id: string): Observable<SalesInvoiceDetails[] | CommonError> {
    const url = `salesInvoice/getSalesInvoiceDetail/${id}`;
    return this.http.get<SalesInvoiceDetails[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }
//#endregion

//#region

getAllSalesReturn(
  resourceParams:SalesReturnResourceParameter
): Observable<HttpResponse<SalesReturn[]>> {
  const url = 'SaleReturn';
  const customParams = new HttpParams()
    .set('Fields', resourceParams.fields)
    .set('OrderBy', resourceParams.orderBy)
    .set('PageSize', resourceParams.pageSize.toString())
    .set('Skip', resourceParams.skip.toString())
    .set('SearchQuery', resourceParams.searchQuery)
    .set('name', resourceParams.name)
    .set('invoiceDate', resourceParams.invoiceDate ? resourceParams.invoiceDate.toDateString() : '')
    .set('invoiceNumber', resourceParams.invoiceNumber)
    .set('fromDate', resourceParams.fromDate ? resourceParams.fromDate.toDateString() : '')
    .set('toDate', resourceParams.toDate ? resourceParams.toDate.toDateString() : '')
    .set('branchUUID', resourceParams.branchUUID ? resourceParams.branchUUID : '')
    .set('deviceUUID', resourceParams.deviceUUID ? resourceParams.deviceUUID : '');
  return this.http.get<SalesReturn[]>(url, {
    params: customParams,
    observe: 'response'
  });
}


getSalesReturnDetail(id: string): Observable<SaleReturnDetail[] | CommonError> {
  const url = `SaleReturn/SalesReturnDetails/${id}`;
  return this.http.get<SaleReturnDetail[]>(url)
    .pipe(catchError(this.commonHttpErrorService.handleError));
}


getSalesReturnById(id: string): Observable<SalesReturn> {
  const url = `SaleReturn/${id}`;
  return this.http.get<SalesReturn>(url);
}

//#endregion



}
