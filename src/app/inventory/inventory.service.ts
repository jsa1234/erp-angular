import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpeningStock } from '@core/domain-classes/opening-stock';
import { OpeningStockResourceParameter } from '@core/domain-classes/opening-stock-resourceparameter';
import { Product } from '@core/domain-classes/product';
import { IStockTransfer } from '@core/domain-classes/stock-transfe.interface';
import { IStockTransferItem } from '@core/domain-classes/stock-transfer-items.interface';
import { StockTransferResourceParameter } from '@core/domain-classes/stock-trasfer-resource-parameter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }
  getOpeningStocks(resourceParams:OpeningStockResourceParameter){
    const url = 'OpeningStock'
    const customParams = new HttpParams()
    .set('branchUUID', resourceParams.branch)
    .set('productcategoryUUID',resourceParams.category)
    .set('productUUID',resourceParams.product)
    return this.http.get<OpeningStock[]>(url,{
      params:customParams
    })
  }
  updateOpeningStocks(payload:any,branchUUID:string){
    const url = `OpeningStock/${branchUUID}`
    return this.http.put<OpeningStock>(url,payload)
  }

  getProductsByCategory(categoryUUID: string) {
    const url = `Product_Web/GetProductByCategory/${categoryUUID}`;
    return this.http.get<Product[]>(url); // Using GET instead of PUT
  }
  




  // service for stock transfer

  getAllStockTransfers(resourceParams:StockTransferResourceParameter):Observable<HttpResponse<IStockTransfer[]>>{
    const url = 'StockTransfer/GetAllStockTransfers';
    const customParams = new HttpParams()
    .set('Fields', resourceParams?.fields)
    .set('OrderBy', resourceParams?.orderBy)
    .set('PageSize', resourceParams?.pageSize?.toString())
    .set('Skip', resourceParams?.skip?.toString())
    .set('SearchQuery', resourceParams?.searchQuery)
    .set('docDate',  resourceParams?.docDate?.toDateString() || '')
    .set('docNo', resourceParams?.docNo )
    .set('fromDate',resourceParams?.fromDate?.toDateString() || '')
    .set('toDate', resourceParams?.toDate?.toDateString() || '')
    // .set('branchUUID',  resourceParams?.branchUUID || '')
  return this.http.get<IStockTransfer[]>(url, {
    params: customParams,
    observe: 'response'
  });
}

  addStockTransfer(stockTransferData:any){
    const url = 'StockTransfer/AddStockTransfer'
    return this.http.post<any>(url,stockTransferData)
  }

  updateStockTransfer(stockTransferData:any){
    const url = `StockTransfer/UpdateStockTransfer/${stockTransferData.stockTransferUUID}`
    return this.http.put<any>(url,stockTransferData)
  }

  getStockTransferDetailsWithStockTransfer(id:string):Observable<IStockTransferItem[]>{
    const url =`StockTransfer/GetStockTransferDetailsWithStockTransfer/${id}`
    return this.http.get<IStockTransferItem[]>(url)
    
  }
  
  deleteStockTransfer(id:string){
    const url =`StockTransfer/DeleteStockTransfer/${id}`
    return this.http.delete(url)
  }
  
  getSingleStockTransfer(id:string):Observable<IStockTransfer>{
    const url =`StockTransfer/GetSingleStockTransfer/${id}`
    return this.http.get<IStockTransfer>(url)

  }
}
