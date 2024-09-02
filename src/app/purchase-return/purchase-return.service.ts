import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPurchaseReturn } from '@core/domain-classes/purchase-order/purchase-return-invoice';
import { PurchaseReturnResourceParameter } from '@core/domain-classes/purchase-order/purchase-return-resource';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReturnService {

  constructor(private http: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }


    addPurchaseReturn(purchaseReturn: IPurchaseReturn): Observable<any | CommonError> {
      const url = `PurchaseReturn`;
      return this.http.post<any>(url, purchaseReturn)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
    updatePurchaseReturn(purchaseReturn: IPurchaseReturn): Observable<any | CommonError> {
      const url = `PurchaseReturn/${purchaseReturn.purchaseReturnUUID}`;
      return this.http.put<any>(url, purchaseReturn)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    getPurchaseReturnById(purchaseReturnUUID: string): Observable<IPurchaseReturn> {
      const url = `PurchaseReturn/${purchaseReturnUUID}`;
      return this.http.get<IPurchaseReturn>(url);
    }

    deletePurchaseReturn(purchaseReturnUUID: string): Observable<any | CommonError>{
        const url = `PurchaseReturn/${purchaseReturnUUID}`;
        return this.http.delete<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
    getAllPurchaseReturn(
      resourceParams:PurchaseReturnResourceParameter
    ): Observable<HttpResponse<IPurchaseReturn[]>> {
      const url = 'purchaseReturn';
      const customParams = new HttpParams()
        .set('Fields', resourceParams.fields)
        .set('OrderBy', resourceParams.orderBy)
        .set('PageSize', resourceParams.pageSize.toString())
        .set('Skip', resourceParams.skip.toString())
        .set('SearchQuery', resourceParams.searchQuery)
        .set('name', resourceParams.name)
        .set('docDate', resourceParams.invoiceDate ? resourceParams.invoiceDate.toDateString() : '')
        .set('docNo', resourceParams.invoiceNumber)
        .set('fromDate', resourceParams.fromDate ? resourceParams.fromDate.toDateString() : '')
        .set('toDate', resourceParams.toDate ? resourceParams.toDate.toDateString() : '')
        .set('branchUUID', resourceParams.branchUUID ? resourceParams.branchUUID : '')
        .set('deviceUUID', resourceParams.deviceUUID ? resourceParams.deviceUUID : '');
      return this.http.get<IPurchaseReturn[]>(url, {
        params: customParams,
        observe: 'response'
      });
    }
}
