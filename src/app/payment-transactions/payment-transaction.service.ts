import { HttpResponse,HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaymentTransactions } from '@core/domain-classes/payment-transactions.interface';
import { PaymentTransactionsResourceParameter } from '@core/domain-classes/payment-transactions.resource.parameter';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentTransactionService {

  constructor(private http:HttpClient,private commonHttpErrorService: CommonHttpErrorService) { }
  getDocuments(resource: PaymentTransactionsResourceParameter): Observable<HttpResponse<IPaymentTransactions[]> | CommonError> {
    const url = `PaymentTransactions`;
    const customParams = new HttpParams()
      .set('Fields', resource?.fields)
      .set('OrderBy', resource?.orderBy)
      .set('PageSize', resource?.pageSize.toString())
      .set('Skip', resource?.skip.toString())
      .set('SearchQuery', resource?.searchQuery)
      .set('branchUUID', resource?.branchUUID)
      .set('deviceUUID', resource?.deviceUUID)
      .set('fromDate', resource?.fromDate?.toDateString() || '')
      .set('toDate', resource?.toDate?.toDateString() || '')
      .set('transactionDate', resource?.transactionDate?.toDateString() || '')
      .set('transactionNo', resource?.trasactionDocumentNo)
      .set('transactionMode', resource?.transactionMode)
      .set('transactionStatus', resource?.transactionStatus)
      .set('financialYearUUID', resource?.financialYearUUID)

    return this.http.get<IPaymentTransactions[]>(url, {
      params: customParams,
      observe: 'response'
    }).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  deletePaymentTransaction(uuid:string){
    const url =`PaymentTransaction/${uuid}`;
    return this.http.delete(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
}
