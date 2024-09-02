import { HttpParams ,HttpResponse,HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccountHead } from '@core/domain-classes/account-head';
import { LedgerResourceParameter } from '@core/domain-classes/report-classes/statement-of-account-resource-parameter';
import { StatementOfAccount } from '@core/domain-classes/report-classes/statment-of-accounts';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatementOfAccountsService {

  constructor(private http:HttpClient) { }

  getLedgerReport(
    resourceParams:LedgerResourceParameter
  ): Observable<StatementOfAccount> {
    const url = 'LedgerReport/GetLedgerReportNormal';
    const customParams = new HttpParams()
    .set('deviceUUID', resourceParams.device)
    .set('branchUUID', resourceParams.branch)
    .set('accountUUID', resourceParams.account)
    .set('fromDate', resourceParams.fromDate? resourceParams.fromDate.toDateString():'')
    .set('toDate',  resourceParams.toDate? resourceParams.toDate.toDateString():'')
    return this.http.get<StatementOfAccount>(url, {
      params: customParams,

    });
}
getAccountGroups():Observable<IAccountHead[]>{
const url='GetRootAccounts';
return this.http.get<IAccountHead[]>(url)
}
getLedger(id: string): Observable<IAccountHead[]> {
  const url = 'GetChildren/' + id;
  return this.http.get<IAccountHead[]>(url);
}
getSubLedger(id: string): Observable<IAccountHead[]> {
  const url = 'GetChildren/' + id;
  return this.http.get<IAccountHead[]>(url);
}
getAccountHead(id: string): Observable<IAccountHead[]> {
  const url = 'GetChildren/' + id;
  return this.http.get<IAccountHead[]>(url);
}
}
