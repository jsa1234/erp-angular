import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDamageEntryDetail } from '@core/domain-classes/damage-entry-details.interface';
import { DamageEntryResourceParameter } from '@core/domain-classes/damage-entry-resource-parameter';
import { IDamageEntry } from '@core/domain-classes/damage-entry.interface';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DamageEntryService {

  constructor(private http:HttpClient, private commonHttpErrorService: CommonHttpErrorService) { }

  getAllDamageEntry(
    resourceParams:DamageEntryResourceParameter
  ): Observable<HttpResponse<IDamageEntry[]>> {
    const url = 'Damage/GetAllDamages';
    const customParams = new HttpParams()
      .set('Fields', resourceParams?.fields)
      .set('OrderBy', resourceParams?.orderBy)
      .set('PageSize', resourceParams?.pageSize.toString())
      .set('Skip', resourceParams?.skip.toString())
      .set('SearchQuery', resourceParams?.searchQuery)
      .set('docDate', resourceParams?.docDate?.toDateString() ?? '')
      .set('docNo', resourceParams?.docNo)
      .set('fromDate', resourceParams?.fromDate?.toDateString()?? '')
      .set('toDate',  resourceParams?.toDate?.toDateString()?? '')
      .set('branchUUID',  resourceParams?.branchUUID ??'')
      .set('deviceUUID', resourceParams?.deviceUUID ?? '');
    return this.http.get<IDamageEntry[]>(url, {
      params: customParams,
      observe: 'response'
    })
    }


    deleteDamageEntry(id: string): Observable<void> {
      const url = `Damage/DeleteDamage/${id}`;
      return this.http.delete<void>(url);
    }


    getDamageEntryById(damageUUID: string): Observable<IDamageEntry> {
      const url =`Damage/GetSingleDamage/${damageUUID}`;
      return this.http.get<IDamageEntry>(url);
    }


    saveDamageEntry(damageEntry:IDamageEntry):Observable<IDamageEntry>{
      const url =`Damage/AddDamage`;
      return this.http.post<IDamageEntry>(url,damageEntry);
    }
    updateDamageEntry(damageEntry:IDamageEntry):Observable<IDamageEntry>{
      const url =`Damage/UpdateDamage/${damageEntry.damageUUID}`;
      return this.http.put<IDamageEntry>(url,damageEntry);
    }
    getDamageItems(id:string):Observable<IDamageEntryDetail[]>{
      const url =`Damage/GetDamageDetailWithDamage/${id}`;
      return this.http.get<IDamageEntryDetail[]>(url);
    }
}
