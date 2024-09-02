import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationsResourceParameter } from '@core/domain-classes/masters/locations-resource-parameter';
import { District } from '@core/domain-classes/district';
@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http:HttpClient) { }

  getDistricts(resourceParams:LocationsResourceParameter):Observable<HttpResponse<District[]>>{
    const url = 'Districts'
    const customParams = new HttpParams()      
    .set('Fields', resourceParams.fields)
    .set('OrderBy', resourceParams.orderBy)
    .set('PageSize', resourceParams.pageSize.toString())
    .set('Skip', resourceParams.skip.toString())
   return this.http.get<District[]>(url,{params:customParams,observe: 'response'})
  }
  getDistrictByState(stateUuid:string,isActive:boolean):Observable<District[]>{
    const url = `District/GetDistrictByState/${stateUuid}`
    const customParams = new HttpParams()      
    .set('isActive', isActive)
    return this.http.get<District[]>(url,{params:customParams})
  }
  delete(id:string){
    const url = `District/${id}`
    return this.http.delete(url)

  }
  add(districtData:District){
    const url = 'District'
    return this.http.post(url,districtData)
  }

  update(districtData:District){
      const url = `District/${districtData.districtUUID}`
    return this.http.put(url,districtData)
  }
}
