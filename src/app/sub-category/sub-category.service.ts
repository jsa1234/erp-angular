import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSubcategory } from '@core/domain-classes/product-subcategory';
import {  SubcategoryResourceParameter } from '@core/domain-classes/masters/subcategory-resource-parameter';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http:HttpClient) { }

  getProductSubcategory(resourceParams:SubcategoryResourceParameter):Observable<HttpResponse<ProductSubcategory[]>>{
    const url = 'ProductSubCategories'
    const customParams = new HttpParams()      
    .set('Fields', resourceParams.fields)
    .set('OrderBy', resourceParams.orderBy)
    .set('PageSize', resourceParams.pageSize.toString())
    .set('Skip', resourceParams.skip.toString())
    .set('NameEnglish', resourceParams.nameEnglish)
   return this.http.get<ProductSubcategory[]>(url,{params:customParams,observe: 'response'})
  }

  getProductSubCategorybyCategory(resourceParams:SubcategoryResourceParameter):Observable<ProductSubcategory[]>{
    const url =`ProductSubCategorybyCategory/${resourceParams.categoryUUID}`
    const customParams = new HttpParams().set('isActive',resourceParams.isActive)
    return this.http.get<ProductSubcategory[]>(url,{params:customParams}).pipe(
      map(item => item.sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish)))
    );
  }
  delete(id:string){
    const url = `ProductSubCategory/${id}`
    return this.http.delete(url)

  }
  add(subCategory:ProductSubcategory){
    const url = 'ProductSubCategory'
    return this.http.post(url,subCategory)
  }

  update(subCategory:ProductSubcategory){
      const url = `ProductSubCategory/${subCategory.subCategoryUUID}`
    return this.http.put(url,subCategory)
  }
}
