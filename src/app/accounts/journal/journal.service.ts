import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJournal } from '@core/domain-classes/journal';
import { IJournalDetail } from '@core/domain-classes/journal-details';
import { JournalResourceParameter } from '@core/domain-classes/journal-resource-parameter';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http:HttpClient,
    private commonHttpErrorService:CommonHttpErrorService) { }


  getAllJournals(resourceParams:JournalResourceParameter):Observable<HttpResponse<IJournal[]> |CommonError>{
    const url = 'Journal/GetJournals'
    const customParams =  new HttpParams()
    .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('docDate',  resourceParams.journalDate ? resourceParams.journalDate.toDateString() : '')
      .set('fromDate',  resourceParams.fromDate ? resourceParams.fromDate.toDateString() : '')
      .set('toDate',  resourceParams.toDate ? resourceParams.toDate.toDateString() : '')
      .set('branchUUID',  resourceParams.branch)
      .set('docNo',  resourceParams.journalNo)
      .set('deviceUUID',  resourceParams.device)
      return this.http.get<IJournal[]>(url, {
        params: customParams,
        observe: 'response'
      }).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getJournalDetail(id:string):Observable<IJournalDetail[]>{
    const url = `Journal/GetJournalDetails/${id}`
    return this.http.get<IJournalDetail[]>(url)
  }

  
  getSingleJournalDetail(id: string): Observable<IJournal> {
    const url = `journal/${id}`;
    return this.http.get<IJournal>(url);
  }

  createJournal(voucher:IJournal){
    const url = 'Journal'
    return this.http.post(url,voucher)
  }
  updateJournal(voucher:IJournal){
    const url = `Journal/${voucher.journalUUID}`
    return this.http.put(url,voucher)
  }
  deleteJournal(id:string){
    const url = `Journal/${id}`
    return this.http.delete(url)
  }
  
}
