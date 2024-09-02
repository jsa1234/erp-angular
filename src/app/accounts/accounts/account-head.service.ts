import { HttpParams, HttpResponse,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountHead } from '@core/domain-classes/account-head';
import { AccountHeadResourceParameter } from '@core/domain-classes/account-head-resource-parameter';
import { AccountHeadTree } from '@core/domain-classes/account-head-tree';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountHeadService {

  constructor(private http:HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }

  getAccountHead(resourceParams:AccountHeadResourceParameter):Observable<HttpResponse<AccountHead[]> |CommonError>{
    const url = 'AccountHead'
    const customParams =  new HttpParams()
    .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('nameEnglish', resourceParams.nameEnglish)
      .set('accountCode', resourceParams.accountCode)
      .set('nameSecondLanguage', resourceParams.nameSecondLanguage)
      .set('group', resourceParams.group)
      .set('ledger', resourceParams.ledger)
      .set('subLedger', resourceParams.subledger)
      return this.http.get<AccountHead[]>(url, {
        params: customParams,
        observe: 'response'
      }).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  getAccountHeadTree():Observable<AccountHeadTree[]>{
    const url = 'GetAccountTree'
    return this.http.get<AccountHeadTree[]>(url)
  }
  createAccountHeadTree(data:AccountHead){
    const url = 'AccountHead'
    return this.http.post<AccountHead>(url,data)
  }
  deleteAccountHeadTree(id:string): Observable<void>{
    const url = `AccountHead/${id}`
    return this.http.delete<void>(url)
  }
  updateAccountHeadTree(id:string,data:AccountHead): Observable<AccountHeadTree>{
    const url = `AccountHead/${id}`
    return this.http.put<AccountHeadTree>(url,data)
  }
  
  getAllLevelThreeAccountHeads():Observable<AccountHeadTree[]>{
    const url = 'GetAllLevelThreeAccountHeads'
    return this.http.get<AccountHeadTree[]>(url)

  }
}
