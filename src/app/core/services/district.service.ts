import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { District  } from '@core/domain-classes/district';

@Injectable({providedIn: 'root'})
export class DistrictService extends EntityCollectionServiceBase<District>  {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
      super('District', serviceElementsFactory);
  }

}
