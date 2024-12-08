import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { POSDeviceResourceParameter } from '@core/domain-classes/pos-device-resource-parameter';
import { POSDevice } from '@core/domain-classes/pos-device.interface';
import { CommonError } from '@core/error-handler/common-error';
import { CommonErrorHandlerService } from '@core/error-handler/common-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PosDeviceService {

  constructor(private http:HttpClient,private commonHttpErrorService:CommonErrorHandlerService) { }


  createPosDevice(posDevice:any):Observable<any | CommonError>{
    const url = 'Counter';
    return this.http.post<any>(url,posDevice).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  updatePosDevice(posDevice:any):Observable<any | CommonError>{
    const url = `Counter/${posDevice.counterUUID}`;
    return this.http.patch<any>(url,posDevice).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  deletePosDevice(id:string):Observable<any | CommonError>{
    const url = `Counter/${id}`;
    return this.http.delete<any>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  getSinglePosDevice(id:string):Observable<any | CommonError>{
    const url = `Counter/${id}`;
    return this.http.get<any>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  getPOSDeviceList(resourceParams:POSDeviceResourceParameter):Observable<HttpResponse<POSDevice[]> | CommonError>{
    const url = `Counters/all`;
    const customParams = new HttpParams()
    .set('Fields', resourceParams.fields)
    .set('OrderBy', resourceParams.orderBy)
    .set('PageSize', resourceParams.pageSize.toString())
    .set('Skip', resourceParams.skip.toString())
    .set('SearchQuery', resourceParams.searchQuery)
    .set('POSDeviceCode', resourceParams.counterId)
    .set('NameEnglish', resourceParams.counterName)
    .set('SerialNo', resourceParams.isInstalled)
    .set('DeviceModel', resourceParams.branchName)
    return this.http.get<POSDevice[]>(url,{
      params:customParams,
      observe:'response'
    }).pipe(catchError(this.commonHttpErrorService.handleError));
  }



  getActivePOSDevice():Observable<POSDevice[] | CommonError>{
    const url = `GetActivePOSDevice`;
    return this.http.get<POSDevice[]>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
}

