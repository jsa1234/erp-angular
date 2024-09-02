import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from '@core/domain-classes/unit';
import { Observable } from 'rxjs';
import { UnitResourceParameter } from '@core/domain-classes/masters/unit-resource-parameter';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http:HttpClient) { }

  getUnits(resourceParams:UnitResourceParameter):Observable<HttpResponse<Unit[]>>{
    const url = 'Units'
    const customParams = new HttpParams()      
    .set('Fields', resourceParams.fields)
    .set('OrderBy', resourceParams.orderBy)
    .set('PageSize', resourceParams.pageSize.toString())
    .set('Skip', resourceParams.skip.toString())
   return this.http.get<Unit[]>(url,{params:customParams,observe: 'response'})
  }
  getActiveUnits():Observable<Unit[]>{
    const url = 'GetActiveUnits'
    return this.http.get<Unit[]>(url).pipe(
      map(units => units.sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish)))
    );
  }
  delete(id:string){
    const url = `Unit/${id}`
    return this.http.delete(url)

  }
  add(unitData:Unit){
    const url = 'Unit'
    return this.http.post(url,unitData)
  }

  update(unitData:Unit){
      const url = `Unit/${unitData.unitUUID}`
    return this.http.put(url,unitData)
  }
}
