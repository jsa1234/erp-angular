import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { POSPrinterResourceParameter } from '@core/domain-classes/pos-printer-resource-parameter';
import { POSPrinter } from '@core/domain-classes/pos-printer.interface';
import { CommonError } from '@core/error-handler/common-error';
import { CommonErrorHandlerService } from '@core/error-handler/common-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PosPrinterService {

  constructor(private http:HttpClient, private commonHttpErrorService:CommonErrorHandlerService) { }

  createPosPrinter(posPrinter:POSPrinter):Observable<POSPrinter>{
    const url= 'POSPrinter';
    return this.http.post<POSPrinter>(url,posPrinter);
  }
  updatePosPrinter(posPrinter:POSPrinter):Observable<POSPrinter>{
    const url= `POSPrinter/${posPrinter.posPrinterUUID}`;
    return this.http.put<POSPrinter>(url,posPrinter);
  }
  getSinglePosPrinter(id:string):Observable<POSPrinter>{
    const url = `POSPrinter/${id}`;
    return this.http.get<POSPrinter>(url);
  }

  getPOSPrinterList(resourceParams:POSPrinterResourceParameter):Observable<HttpResponse<POSPrinter[]> | CommonError>{
    const url = `POSPrinter`;
    const customParams = new HttpParams()
    .set('Fields', resourceParams.fields)
    .set('OrderBy', resourceParams.orderBy)
    .set('PageSize', resourceParams.pageSize.toString())
    .set('Skip', resourceParams.skip.toString())
    .set('SearchQuery', resourceParams.searchQuery)
    .set('ModelName', resourceParams.modelName)
    .set('NameEnglish', resourceParams.nameEnglish)
    .set('SerialNo', resourceParams.serialNo)
    return this.http.get<POSPrinter[]>(url,{
      params:customParams,
      observe:'response'
    }).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deletePosPrinter(id:string):Observable<POSPrinter | CommonError>{
    const url = `POSPrinter/${id}`;
    return this.http.delete<POSPrinter>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getActivePOSPrinter():Observable<POSPrinter[] | CommonError>{
    const url = `GetActivePOSPrinter`;
    return this.http.get<POSPrinter[]>(url).pipe(catchError(this.commonHttpErrorService.handleError));
  }
}
