import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Unit } from '@core/domain-classes/unit';
import { Brand } from '@core/domain-classes/brand';

@Injectable({providedIn: 'root'})
export class BrandService extends EntityCollectionServiceBase<Brand>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Brand',serviceElementsFactory);
        
    }
}