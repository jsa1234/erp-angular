import { HttpParams, HttpClient, HttpResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleOrderDetail } from '@core/domain-classes/sale-order-detail.interface';
import { SaleOrderResourceParameter } from '@core/domain-classes/sale-order-resoource-parameter';
import { ISaleOrder } from '@core/domain-classes/sale-order.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderService {

  constructor(private http:HttpClient) { }


  getAllSaleOrder(
    resourceParams: SaleOrderResourceParameter
  ): Observable<HttpResponse<ISaleOrder[]>> {
    const url = 'saleOrder';
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

    return this.http.get<ISaleOrder[]>(url, {
      params: customParams,
      observe: 'response'
    });
  }

  getSingleSaleOrder(id:string):Observable<ISaleOrder>{
    const url = `SaleOrder/${id}`
    return this.http.get<ISaleOrder>(url);
  }

  getSaleOrderItems(id:string):Observable<SaleOrderDetail[]>{
    const url = `SaleOrder/GetSaleOrderDetail/${id}`;
    return this.http.get<SaleOrderDetail[]>(url);
  }
}
