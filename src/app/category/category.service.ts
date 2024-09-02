import { HttpClient,HttpParams,HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoryResourceParameter } from "@core/domain-classes/masters/category-resource-parameter";
import { ProductCategory } from "@core/domain-classes/product-category";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})
export class CategoryService{
  
    constructor(private http:HttpClient) {
    }

    getCategory(resourceParams:CategoryResourceParameter):Observable<HttpResponse<ProductCategory[]>>{
        const url ='ProductCategories'
        const customParams = new HttpParams()
        .set('Fields', resourceParams.fields)
        .set('OrderBy', resourceParams.orderBy)
        .set('PageSize', resourceParams.pageSize.toString())
        .set('Skip', resourceParams.skip.toString())
        .set('NameEnglish', resourceParams.nameEnglish)
        return this.http.get<ProductCategory[]>(url,{params:customParams,observe:'response'})
    }

      getActiveCategories():Observable<ProductCategory[]>{
        const url = 'ProductCategory/GetActiveCategories'
        return this.http.get<ProductCategory[]>(url).pipe(
            map(item => item.sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish)))
          );
      }

    add(categoryData:ProductCategory){
        const url = 'ProductCategory'
        return this.http.post(url,categoryData)
    }

    update(categoryData:ProductCategory){
        const url = `ProductCategory/${categoryData.categoryUUID}`
        return this.http.put(url,categoryData)
    }

    delete(id:string){
        const url = `ProductCategory/${id}`
        return this.http.delete(url)
    }
}