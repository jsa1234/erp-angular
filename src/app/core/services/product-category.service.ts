import { Injectable } from '@angular/core';
import { ProductCategory } from '@core/domain-classes/product-category';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({providedIn: 'root'})
export class ProductCategoryService extends EntityCollectionServiceBase<ProductCategory>  {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
      super('ProductCategory', serviceElementsFactory);
  }

}
