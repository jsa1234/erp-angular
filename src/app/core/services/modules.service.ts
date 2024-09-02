import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Module } from '@core/domain-classes/module';

@Injectable({providedIn: 'root'})
export class ModuleService extends EntityCollectionServiceBase<Module>  {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
      super('Module', serviceElementsFactory);
  }

}
