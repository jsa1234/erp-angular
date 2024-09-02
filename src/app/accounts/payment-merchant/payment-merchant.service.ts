import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { POSMerchantAccountResourceParameter } from '@core/domain-classes/pos-merchant-account-resource-parameter';
import { POSMerchantAccount } from '@core/domain-classes/pos-merchant-account.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentMerchantService {
  constructor(private http: HttpClient) {}

  getAllPaymentMerchantType(): Observable<string[]> {
    const url = 'POSMerchantTypes';
    return this.http.get<string[]>(url);
  }

  createMerchantAccount(
    merchantAccount: POSMerchantAccount
  ): Observable<POSMerchantAccount> {
    const url = 'POSMerchantAccount';
    return this.http.post<POSMerchantAccount>(url, merchantAccount);
  }
  updateMerchantAccount(
    merchantAccount: POSMerchantAccount
  ): Observable<POSMerchantAccount> {
    const url = `POSMerchantAccount/${merchantAccount.posMerchantUUID}`;
    return this.http.put<POSMerchantAccount>(url, merchantAccount);
  }

  deleteMerchantAccount(id: string): Observable<POSMerchantAccount> {
    const url = `POSMerchantAccount/${id}`;
    return this.http.delete<POSMerchantAccount>(url);
  }

  getAllPosMerchantAccount(
    resourceParams: POSMerchantAccountResourceParameter
  ): Observable<HttpResponse<POSMerchantAccount[]>> {
    const url = 'POSMerchantAccount';
    const customParam = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('nameEnglish', resourceParams.nameEnglish);
    return this.http.get<POSMerchantAccount[]>(url, {
      params: customParam,
      observe: 'response',
    });
  }

  getSinglePosMerchantAccount(id:string):Observable<POSMerchantAccount>{
    const url = `POSMerchantAccount/${id}`;
    return this.http.get<POSMerchantAccount>(url);
  }
}
