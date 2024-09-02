import { Injectable } from '@angular/core';
import { Device, IDevice } from '@core/domain-classes/device';
import { DeviceResourceParameter } from '@core/domain-classes/device-resource-parameter';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { CommonError } from '@core/error-handler/common-error';
import { BehaviorSubject, Observable } from 'rxjs';
import { SyncResourceParameter } from '@core/domain-classes/sync-resource-parameter';
import { ISyncLogs } from '@core/domain-classes/sync-logs';
import { ISyncSessions } from '@core/domain-classes/sync-sessions';
import { SystemFlagConfiguration } from '@core/domain-classes/device-configuration.interface';
import { DeviceUser } from '@core/domain-classes/device-user.interface';
import { POSDevice } from '@core/domain-classes/pos-device.interface';
import { POSPrinter } from '@core/domain-classes/pos-printer.interface';
import { DevicePOSPrinter } from '@core/domain-classes/device-pos-printer.interface';
import { DevicePOSDevice } from '@core/domain-classes/device-pos-device.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private deviceSource$ = new BehaviorSubject<IDevice[]>([])
  deviceList$ = this.deviceSource$.asObservable()
  constructor(private http:HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }

  
  GetDevice(
    resourceParams: DeviceResourceParameter
  ): Observable<HttpResponse<Device[]> |CommonError> {
    const url = 'Devices';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('deviceIdentifier', resourceParams.deviceIdentifier)
      .set('modelNo', resourceParams.modelNo)
      .set('nameEnglish', resourceParams.nameEnglish)
      .set('nameSecondLanguage', resourceParams.nameSecondLanguage)

    return this.http.get<Device[]>(url, {
      params: customParams,
      observe: 'response'
    }).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  GetDevices():Observable<IDevice[]>{
    const url = 'DeviceList';
    return this.http.get<IDevice[]>(url)
  }
  GetSingleDevice(deviceUuid:string):Observable<IDevice>{
    const url = `Device/${deviceUuid}`;
    return this.http.get<IDevice>(url)
  }

GetDevicesByBranch(branchUuid:string):Observable<IDevice[]>{
  const url = `Devices/GetDevicesByBranch/${branchUuid}`;
  return this.http.get<IDevice[]>(url);
}



  RegenereateActCode(deviceUUID:string):Observable<IDevice>{
    const url = `Device/RegenereateActCode/${deviceUUID}`;
    return this.http.put<IDevice>(url,null)
  }



  ReadyForActivate(deviceUUID:string,branchUUID:string):Observable<IDevice>{
    const url = `Device/ReadyForActivate/${deviceUUID}`;
    return this.http.put<IDevice>(url,branchUUID)
  }




  DeActivateDevice(deviceUUID:string,deviceId:number):Observable<IDevice>{
    const url  = `Device/DeActivateDevice?DeviceUUID=${deviceUUID}&DeviceId=${deviceId}`;
    return this.http.put<IDevice>(url,null)
  }

  SetDevices(device:IDevice[]){
    this.deviceSource$.next(device)
  }

  GetSyncLogs(
    resourceParams: SyncResourceParameter
  ): Observable<HttpResponse<ISyncLogs[]> |CommonError> {
    const url = 'SyncLogs';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('DeviceUUID',resourceParams.DeviceUUID)
    return this.http.get<ISyncLogs[]>(url, {
      params: customParams,
      observe: 'response'
    }).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  GetSyncSessions(
    resourceParams: SyncResourceParameter
  ): Observable<HttpResponse<ISyncSessions[]> |CommonError> {
    const url = 'SyncSessions';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('DeviceUUID',resourceParams.DeviceUUID)
    return this.http.get<ISyncSessions[]>(url, {
      params: customParams,
      observe: 'response'
    }).pipe(catchError(this.commonHttpErrorService.handleError));
  }


  DeviceTransfer(deviceData:any){
    const url = 'Device/DeviceTransfer';
    return this.http.put(url,deviceData).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  GetDeviceSystemFlags(deviceUuid: string): Observable<SystemFlagConfiguration[]> {
    const url = `GetDeviceSystemFlags/${deviceUuid}`;
    return this.http.get<SystemFlagConfiguration[]>(url)
  }
  UpdateDeviceSystemFlag(systemFlag:SystemFlagConfiguration[]){
    const url = 'Device/UpdateDeviceSystemFlag';
    return this.http.put(url,systemFlag).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  GetAllDeviceUsers(deviceUuid:string): Observable<DeviceUser[] |CommonError>{
    const url = `GetAllDeviceUsers/${deviceUuid}`
    return this.http.get<DeviceUser[]>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  GetSingleDeviceUsers(userUuid:string): Observable<DeviceUser |CommonError>{
    const url = `GetDeviceUser/${userUuid}`
    return this.http.get<DeviceUser>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  AddDeviceUser(deviceUserData:DeviceUser){
    const url = `Device/AddDeviceUser`
    return this.http.post(url,deviceUserData).pipe(catchError(this.commonHttpErrorService.handleError));
  }
  UpdateDeviceUser(deviceUserData:DeviceUser){
    const url = `Device/UpdateDeviceUser`
    return this.http.put(url,deviceUserData).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  DeleteDeviceUser(id: string): Observable<void | CommonError> {
    const url = `Device/DeleteDeviceUser/${id}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  UpdateDeviceUserPin(data:any){
    const url = `Device/UpdateDeviceUserPin`
    return this.http.put(url,data).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateDevicePOSPaymentDevices(uuid:string,posDevice:POSDevice[]):Observable<POSDevice[]>{
    const url = `Device/UpdateDevicePOSPaymentDevices/${uuid}`;
    return this.http.put<POSDevice[]>(url,posDevice)
  }
  updateDevicePOSPrinter(uuid:string,posPrinter:POSPrinter[]):Observable<POSPrinter[]>{
    const url = `Device/UpdateDevicePOSPrinter/${uuid}`;
    return this.http.put<POSPrinter[]>(url,posPrinter)
  }
  

  getDevicePOSPrinter(deviceUUID:string):Observable<DevicePOSPrinter[]>{
    const url = `Devices/GetDevicePOSPrinter/${deviceUUID}`
    return this.http.get<DevicePOSPrinter[]>(url)
  }
  getDevicePOSDevice(deviceUUID:string):Observable<DevicePOSDevice[]>{
    const url = `Devices/GetDevicePOSPaymentDevice/${deviceUUID}`
    return this.http.get<DevicePOSDevice[]>(url)
  }
}

