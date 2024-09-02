import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBranch } from '@core/domain-classes/branch';
import { BranchResourceParameter } from '@core/domain-classes/branch-resource-parameter';
import { SystemFlagConfiguration } from '@core/domain-classes/device-configuration.interface';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient, private commonHttpErrorService:CommonHttpErrorService) { 
    const storedBranch = localStorage.getItem('branch');
    if (storedBranch) {
      const parsedBranch:IBranch = JSON.parse(storedBranch)
      this.branchUUIDSubject$.next(parsedBranch.branchUUID);
      this.isHeadOfficeSubject$.next(parsedBranch.isHeadOffice);
    }
  }


  getAllBranches(resourceParams:BranchResourceParameter):Observable<HttpResponse<IBranch[]>>{
    const url = 'Branches'
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('nameEnglish', resourceParams.nameEnglish)
      .set('nameSecondLanguage', resourceParams.nameSecondLanguage)
      .set('branchUUID', resourceParams.branchUUID)
      .set('financialYearUUID', resourceParams.financialYearUUID)
      .set('branchType', resourceParams.branchType??'')
    return this.http.get<IBranch[]>(url,{params:customParams,observe:'response'})
  }

  getSingleBranch(id: string): Observable<IBranch> {
    const url = `Branch/${id}`;
    return this.http.get<IBranch>(url);
  }

  saveBranch(data:IBranch){
    const url = `Branch`;
    return this.http.post(url,data);
  }
  updateBranch(data:IBranch){
    const url = `Branch/${data.branchUUID}`;
    return this.http.put(url,data);
  }
  deleteBranch(branchId:string){
    const url = `Branch/${branchId}`;
    return this.http.delete(url);
  }

  getAllBranchesForDropdown(companyId:string):Observable<IBranch[]>{
    const url = `GetBranchesByCompany?CompanyUUID=${companyId}`;
    return this.http.get<IBranch[]>(url)
  }

  getBranchConfigurations(id:string):Observable<SystemFlagConfiguration[] | CommonError>{
    const url = `Branch/GetBranchSystemFlags/${id}`;
    return this.http.get<SystemFlagConfiguration[]>(url).pipe(catchError(this.commonHttpErrorService.handleError));
}
updateBranchConfigurations(config:SystemFlagConfiguration[]):Observable<SystemFlagConfiguration[] | CommonError>{
    const url = 'Branch/UpdateBranchSystemFlag';
    return this.http.put<SystemFlagConfiguration[]>(url,config) .pipe(catchError(this.commonHttpErrorService.handleError));
}

private branchUUIDSubject$ = new BehaviorSubject<string>('');
public branchUUID$ = this.branchUUIDSubject$.asObservable();
private isHeadOfficeSubject$ = new BehaviorSubject<boolean>(false);
public isHeadOffice$ = this.isHeadOfficeSubject$.asObservable();


setBranch(branch: IBranch) {
  localStorage.setItem('branch',JSON.stringify(branch))
  this.setBranchUUID(branch.branchUUID);
  this.setisHeadOffice()
}

clearBranch(){
  localStorage.removeItem('branch')
  this.branchUUIDSubject$.next('');
  this.isHeadOfficeSubject$.next(false);
}

setBranchUUID(uuid:string):void{
  this.branchUUIDSubject$.next(uuid);

}
setisHeadOffice():void{
  const branch =JSON.parse( localStorage.getItem('branch'))
  this.isHeadOfficeSubject$.next(branch.isHeadOffice);


}
}
