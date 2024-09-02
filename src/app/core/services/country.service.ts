import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Country } from '@core/domain-classes/Country';

@Injectable({providedIn: 'root'})
export class CountryService extends EntityCollectionServiceBase<Country>  {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
      super('Country', serviceElementsFactory);
  }

}
