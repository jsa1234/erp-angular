import { Injectable } from '@angular/core';
import { ProductSubcategory } from '@core/domain-classes/product-subcategory';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({providedIn: 'root'})
export class ProductSubcategoryService extends EntityCollectionServiceBase<ProductSubcategory>  {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
      super('ProductSubCategory', serviceElementsFactory);
  }

}
