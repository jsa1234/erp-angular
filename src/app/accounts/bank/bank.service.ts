import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankResourceParameter } from '@core/domain-classes/bank-resource-parameter';
import { BankTypes } from '@core/domain-classes/bank-types.interface';
import { Bank } from '@core/domain-classes/bank.interface';
import { CommonError } from '@core/error-handler/common-error';
import { CommonErrorHandlerService } from '@core/error-handler/common-error-handler.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient,private commonHttpErrorService:CommonErrorHandlerService) { }


  getAllBankTypes():Observable<BankTypes[] | CommonError>{
    const url = `Bank/GetAllBankTypes`;
    return this.http.get<BankTypes[]>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  deleteBank(id:string):Observable<CommonError>{
    const url = `Bank/${id}`;
    return this.http.delete(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getBankImagePath(bankLogo: string): Observable<string> {
    const imagePath = `../../../assets/images/bank-logos/${bankLogo.toLowerCase()}.png`;
    return of(imagePath?imagePath:null);
  }
  createBank(bank:Bank):Observable<any | CommonError>{
    const url = 'Bank';
    return this.http.post(url,bank).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  updateBank(bank:Bank):Observable<any | CommonError>{
    const url = `Bank/${bank.accountUUID}`;
    return this.http.put(url,bank).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getAllBanks(resourceParams:BankResourceParameter):Observable<HttpResponse<Bank[]> |CommonError>{
    const url = 'Bank'
    const customParams =  new HttpParams()
    .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('NameEnglish',  resourceParams.nameEnglish)
      .set('AccountNo',  resourceParams.accountNo)
      .set('IFSCCode',  resourceParams.ifscCode)
      return this.http.get<Bank[]>(url, {
        params: customParams,
        observe: 'response'
      }).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getSingleBank(id:string):Observable<Bank | CommonError>{
    const url = `Bank/${id}`;
    return this.http.get<Bank>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getActiveBanks():Observable<Bank[] | CommonError>{
    const url = `Bank/GetActiveBanks`;
    return this.http.get<Bank[]>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
}
