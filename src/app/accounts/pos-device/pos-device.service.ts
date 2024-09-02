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


  createPosDevice(posDevice:POSDevice):Observable<POSDevice | CommonError>{
    const url = 'POSDevice';
    return this.http.post<POSDevice>(url,posDevice).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  updatePosDevice(posDevice:POSDevice):Observable<POSDevice | CommonError>{
    const url = `POSDevice/${posDevice.posDeviceUUID}`;
    return this.http.put<POSDevice>(url,posDevice).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  deletePosDevice(id:string):Observable<POSDevice | CommonError>{
    const url = `POSDevice/${id}`;
    return this.http.delete<POSDevice>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  getSinglePosDevice(id:string):Observable<POSDevice | CommonError>{
    const url = `POSDevice/${id}`;
    return this.http.get<POSDevice>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  getPOSDeviceList(resourceParams:POSDeviceResourceParameter):Observable<HttpResponse<POSDevice[]> | CommonError>{
    const url = `POSDevice`;
    const customParams = new HttpParams()
    .set('Fields', resourceParams.fields)
    .set('OrderBy', resourceParams.orderBy)
    .set('PageSize', resourceParams.pageSize.toString())
    .set('Skip', resourceParams.skip.toString())
    .set('SearchQuery', resourceParams.searchQuery)
    .set('POSDeviceCode', resourceParams.posDeviceCode)
    .set('NameEnglish', resourceParams.nameEnglish)
    .set('SerialNo', resourceParams.serialNo)
    .set('DeviceModel', resourceParams.deviceModel)
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

