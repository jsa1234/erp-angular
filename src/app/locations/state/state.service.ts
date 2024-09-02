import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitResourceParameter } from '@core/domain-classes/masters/unit-resource-parameter';
import { State } from '@core/domain-classes/state';
import { LocationsResourceParameter } from '@core/domain-classes/masters/locations-resource-parameter';
@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http:HttpClient) { }

  getStates(resourceParams:LocationsResourceParameter):Observable<HttpResponse<State[]>>{
    const url = 'States'
    const customParams = new HttpParams()      
    .set('Fields', resourceParams.fields)
    .set('OrderBy', resourceParams.orderBy)
    .set('PageSize', resourceParams.pageSize.toString())
    .set('Skip', resourceParams.skip.toString())
   return this.http.get<State[]>(url,{params:customParams,observe: 'response'})
  }
  getActiveStates():Observable<State[]>{
    const url = 'GetActiveStates'
    return this.http.get<State[]>(url)
  }
  getStateByCountry(countryUUID:string,isActive:boolean):Observable<State[]>{
    const url = `State/GetStateByCountry/${countryUUID}`
    const customParams = new HttpParams()      
    .set('isActive', isActive)
    return this.http.get<State[]>(url,{params:customParams})
  }
  delete(stateUUID:string){
    const url = `State/${stateUUID}`
    return this.http.delete(url)

  }
  add(stateData:State){
    const url = 'State'
    return this.http.post(url,stateData)
  }

  update(stateData:State){
      const url = `State/${stateData.stateUUID}`
    return this.http.put(url,stateData)
  }

}
