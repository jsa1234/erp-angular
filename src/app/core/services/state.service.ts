import { Injectable } from '@angular/core';
import { State } from '@core/domain-classes/state';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({providedIn: 'root'})
export class StateService extends EntityCollectionServiceBase<State>  {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
      super('State', serviceElementsFactory);
  }

}
