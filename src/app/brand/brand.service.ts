import { HttpClient,HttpParams,HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Brand } from "@core/domain-classes/brand";
import { BrandResourceParameter } from "@core/domain-classes/masters/brand-resource-parameter";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})
export class BrandService{
  
    constructor(private http:HttpClient) {
    }

    getBrands(resourceParams:BrandResourceParameter):Observable<HttpResponse<Brand[]>>{
        const url ='Brands'
        const customParams = new HttpParams()
        .set('Fields', resourceParams.fields)
        .set('OrderBy', resourceParams.orderBy)
        .set('PageSize', resourceParams.pageSize.toString())
        .set('Skip', resourceParams.skip.toString())
        return this.http.get<Brand[]>(url,{params:customParams,observe:'response'})
    }
    getActiveBrands():Observable<Brand[]>{
        const url = 'Brand/GetActiveBrands'
        return this.http.get<Brand[]>(url).pipe(
            map(item => item.sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish)))
          );
      }
    add(brandData:Brand){
        const url = 'Brand'
        return this.http.post(url,brandData)
    }

    update(brandData:Brand){
        const url = `Brand/${brandData.brandUUID}`
        return this.http.put(url,brandData)
    }

    delete(id:string){
        const url = `Brand/${id}`
        return this.http.delete(url)
    }
}