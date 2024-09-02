import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICompany } from "@core/domain-classes/company";
import { CompanyProfile } from "@core/domain-classes/company-profile";
import { SystemFlagConfiguration } from "@core/domain-classes/device-configuration.interface";
import { CommonError } from "@core/error-handler/common-error";
import { CommonHttpErrorService } from "@core/error-handler/common-http-error.service";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CompanyProfileService {
    constructor(
        private http: HttpClient,
        private commonHttpErrorService: CommonHttpErrorService) { }

    getCompanyProfile(): Observable<CompanyProfile | CommonError> {
        const url = `companyProfile`;
        return this.http.get<CompanyProfile>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    updateCompanyProfile(companyProfile): Observable<CompanyProfile | CommonError> {
        const url = `companyProfile`;
        return this.http.post<CompanyProfile>(url, companyProfile)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }



    getCompany(): Observable<ICompany | CommonError> {
        const url = `Company`;
        return this.http.get<ICompany>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    updateCompany(companyProfile): Observable<ICompany | CommonError> {
        const url = `Company`;
        return this.http.put<ICompany>(url, companyProfile)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }
    addCompany(companyProfile): Observable<ICompany | CommonError> {
        const url = `Company`;
        return this.http.post<ICompany>(url, companyProfile)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    getCompanyConfigurations(id:string):Observable<SystemFlagConfiguration[]>{
        const url = `Company/GetCompanySystemFlags/${id}`;
        return this.http.get<SystemFlagConfiguration[]>(url);
    }
    updateCompanyConfigurations(config:SystemFlagConfiguration[]):Observable<SystemFlagConfiguration[] | CommonError>{
        const url = 'Company/UpdateCompanySystemFlag';
        return this.http.put<SystemFlagConfiguration[]>(url,config) .pipe(catchError(this.commonHttpErrorService.handleError));
    }
}