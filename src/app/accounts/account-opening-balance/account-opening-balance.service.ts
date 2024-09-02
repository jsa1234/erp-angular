import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountOpeningBalance } from '@core/domain-classes/accoun-opening-balance.interface';
import { AccountOpeningBalanceResourceParameter } from '@core/domain-classes/account-opening-balance-resource-parameter';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountOpeningBalanceService {

  constructor(private http:HttpClient,private commonHttpErrorService: CommonHttpErrorService) { }

  getOpeningBalance(resourceParams:AccountOpeningBalanceResourceParameter):Observable<AccountOpeningBalance[] | CommonError>{
    const url = 'AccountOpeningBalance'
    const customParams =  new HttpParams()
      .set('branchUUID', resourceParams.branchUUID)
      // .set('accountUUID', resourceParams.accountUUID)
      .set('financialYearUUID', resourceParams.financialYearUUID)
      
      
      return this.http.get<AccountOpeningBalance[]>(url, {
        params: customParams}).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  updateAccountOpeningBalance(openingBalance:AccountOpeningBalance[],branchUUID:string):Observable<AccountOpeningBalance | CommonError>{
    const url = `AccountOpeningBalance/${branchUUID}`
    return this.http.put<AccountOpeningBalance>(url,openingBalance).pipe(catchError(this.commonHttpErrorService.handleError))
  }
}