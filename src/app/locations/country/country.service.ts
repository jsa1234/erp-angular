import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { Country } from '@core/domain-classes/country';
import { Country } from '@core/domain-classes/country';
import { LocationsResourceParameter } from '@core/domain-classes/masters/locations-resource-parameter';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  getCountries(resourceParams:LocationsResourceParameter):Observable<HttpResponse<Country[]>>{
    const url = 'Countries'
    const customParams = new HttpParams()      
    .set('Fields', resourceParams.fields)
    .set('OrderBy', resourceParams.orderBy)
    .set('PageSize', resourceParams.pageSize.toString())
    .set('Skip', resourceParams.skip.toString())
   return this.http.get<Country[]>(url,{params:customParams,observe: 'response'})
  }
  getActiveCountries():Observable<Country[]>{
    const url = 'Country/GetActiveCountries'
    return this.http.get<Country[]>(url)
  }
  delete(id:string){
    const url = `Country/${id}`
    return this.http.delete(url)

  }
  add(countryData:Country){
    const url = 'Country'
    return this.http.post(url,countryData)
  }

  update(countryData:Country){
      const url = `Country/${countryData.countryUUID}`
    return this.http.put(url,countryData)
  }
}
