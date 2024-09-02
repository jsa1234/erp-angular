import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@core/domain-classes/action';
import { Page } from '@core/domain-classes/page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserClaimService {

  constructor(private http:HttpClient) { }

  getAllPageByContextType(contextType:number): Observable<Page[]> {
    const url = 'Pages';
    const customParams = new HttpParams()
      .set('contextType', contextType)
    return this.http.get<Page[]>(url, {params: customParams}); 
  }
  getAllActionsByContextType(contextType:number): Observable<Action[]> {
    const url = 'Actions';
    const customParams = new HttpParams()
      .set('contextType', contextType)
    return this.http.get<Action[]>(url, {params: customParams}); 
  }

}
