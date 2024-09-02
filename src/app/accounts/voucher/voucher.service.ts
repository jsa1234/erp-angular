import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVoucher } from '@core/domain-classes/voucher';
import { VoucherResourceParameter } from '@core/domain-classes/voucher-resource-parameter';
import { CommonError } from '@core/error-handler/common-error';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { AccountVoucherDetails } from '@core/domain-classes/account-voucher-details';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http:HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }



  getAllVouchers(resourceParams:VoucherResourceParameter):Observable<HttpResponse<IVoucher[]> |CommonError>{
    const url = 'PaymentVoucher'
    const customParams =  new HttpParams()
    .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('branchUUID', resourceParams.branch)
      .set('deviceUUID', resourceParams.device)
      .set('docNo', resourceParams.voucherNo)
      .set('docDate',  resourceParams.voucherDate ? resourceParams.voucherDate.toDateString() : '')
      .set('fromDate',  resourceParams.fromDate ? resourceParams.fromDate.toDateString() : '')
      .set('toDate',  resourceParams.toDate ? resourceParams.toDate.toDateString() : '')
      return this.http.get<IVoucher[]>(url, {
        params: customParams,
        observe: 'response'
      }).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getVouchertDetails(id:string):Observable<AccountVoucherDetails[]>{
    const url = `PaymentVoucher/GetVocherDetails/${id}`
    return this.http.get<AccountVoucherDetails[]>(url)
  }
  getSingleVoucher(id:string):Observable<IVoucher>{
    const url = `PaymentVoucher/${id}`
    return this.http.get<IVoucher>(url)
  }

  createPaymentVoucher(voucher:IVoucher){
    const url = 'PaymentVoucher'
    return this.http.post(url,voucher)
  }
  updatePaymentVoucher(voucher:IVoucher){
    const url = `PaymentVoucher/${voucher.accountVoucherUUID}`
    return this.http.put(url,voucher)
  }
  deletePaymentVoucher(id:string){
    const url = `PaymentVoucher/${id}`
    return this.http.delete(url)
  }

}
