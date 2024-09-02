import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Tax } from '@core/domain-classes/tax';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { TaxTypes } from '@core/domain-classes/enums/tax-types.enum';
import { TaxBehaviour } from '@core/domain-classes/enums/tax-behaviour.enum';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TaxService extends EntityCollectionServiceBase<Tax>  {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private http:HttpClient) {
      super('Tax', serviceElementsFactory);
  }

  loadTaxTypes():Observable<TaxTypes[]>{
    const url = 'Tax/GetAllTaxTypes'
    return this.http.get<TaxTypes[]>(url)
  }
  loadTaxBehaviour():Observable<TaxBehaviour[]>{
    const url = 'Tax/GetAllTaxBehaviour'
    return this.http.get<TaxBehaviour[]>(url)
  }



  GetTaxesByType(taxTypes: number[]): Observable<any> {
    const requests = taxTypes.map(taxType => {
      const url = `Tax/GetTaxesByType/${taxType}`;
      return this.http.get(url);
    });

    return zip(...requests).pipe(
      map(taxTypesArray => {
        return {
          gstRate: taxTypesArray[0],
          cessRate: taxTypesArray[1]
        };
      })
    );
  }
}
