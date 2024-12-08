import {
  HttpClient,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBarcodeProfileConfigurations } from '@core/domain-classes/barcode-profile-configurations.interface';
import { IBarcodeProfile } from '@core/domain-classes/barcode-profile.interface';
import { ProductResourceParameter } from '@core/domain-classes/product-resource-parameter';
import { IProduct, ProductPrice } from '@core/domain-classes/product';
import { ReportResourceParameter } from '@core/domain-classes/report-classes/purchase-report-resource-parameter';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { } from '@environments/environment';
import { Observable } from 'rxjs';
import { ProductBarcode } from '@core/domain-classes/product-barcode.interface';
import { ProductUploadInfo } from '@core/domain-classes/product-upload-info.interface';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }

  getProducts(
    resourceParams: ProductResourceParameter
  ): Observable<HttpResponse<IProduct[]>> {
    const url = 'Product_Web';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('nameEnglish', resourceParams.nameEnglish)
      .set('productCode', resourceParams.productCode)
      .set('nameSecondLanguage', resourceParams.nameSecondLanguage)
      .set('categoryName', resourceParams.category)
      .set('subCategoryName', resourceParams.subCategory)
      .set('brandName', resourceParams.brand)
      .set('partNo', resourceParams.partNo)
    return this.http.get<IProduct[]>(url, {
      params: customParams,
      observe: 'response'
    }); 
  }
  SearchProduct(
    resourceParams: ProductResourceParameter
  ): Observable<HttpResponse<IProduct[]>> {
    const url = 'Product_Web/SearchProduct';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('nameEnglish', resourceParams.nameEnglish)
      .set('productCode', resourceParams.productCode)
      .set('nameSecondLanguage', resourceParams.nameSecondLanguage)
      .set('categoryName', resourceParams.category)
      .set('subCategoryName', resourceParams.subCategory)
      .set('brandName', resourceParams.brand)
      .set('partNo', resourceParams.partNo)
    return this.http.get<IProduct[]>(url, {
      params: customParams,
      observe: 'response'
    }); 
  }

  getProductsForDropdown(resourceParams:ReportResourceParameter):Observable<IProduct[]>{
    const url = 'Product_Web/GetProductList';
    const customParams = new HttpParams()
    .set('CategoryUUID',resourceParams.category)
    .set('SubCategoryUUID',resourceParams.subcategory)
    .set('BrandUUID',resourceParams.brand)
    return this.http.get<IProduct[]>(url,
      {params:customParams}).pipe(
        map(item => item.sort((a, b) => a.nameEnglish.localeCompare(b.nameEnglish)))
      );
  }


  getProductWithBarcode(barcode: string): Observable<ProductBarcode[]> {
    const url = `Product_Web/SearchProductByBarcode/${barcode}`;
    return this.http.get<ProductBarcode[]>(url);
  }

  getProductVarients(id: string): Observable<ProductPrice[]> {
    const url = `Product_Web/GetPrices/${id}`;
    return this.http.get<ProductPrice[]>(url);
  }

  getSingleProduct(id: string): Observable<IProduct> {
    const url = `Product_Web/${id}`;
    return this.http.get<IProduct>(url);
  }
  deleteProduct(id: string): Observable<void> {
    const url = `Product_Web/${id}`;
    return this.http.delete<void>(url);
  }
  updateProduct(id: string, data: any): Observable<void> {
    const url = `Product_Web/${id}`;
    return this.http.put<void>(url, data);
  }
  saveProduct(data: any): Observable<IProduct> {
    const url = `Product_Web`;
    return this.http.post<IProduct>(url, data);
  }

  getAllBarcodeProfiles():Observable<IBarcodeProfile[]>{
    const url = `BarcodeProfile/GetAllBarcodeProfiles`;
    return this.http.get<IBarcodeProfile[]>(url);
  }

  getBarcodeProfileConfigurations():Observable<IBarcodeProfileConfigurations[]>{
    return this.http.get<IBarcodeProfileConfigurations[]>('./assets/json/barcode-profile-configurations.json')
  }

  downloadFile(): Observable<Blob> {
    const url = 'ProductImport/GetProductBulkuploadExcelTemplate'; 
    return this.http.get(url, { responseType: 'blob' });
  }
 
  uploadFile(file: File):Observable<ProductUploadInfo[]> {
    const url = 'ProductImport/upload';
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<ProductUploadInfo[]>(url, formData);
  }
  saveBulkProducts(productsList:ProductUploadInfo[]){
    const url = 'ProductImport/SaveProduct';
    return this.http.post(url,productsList)
  }
}
