import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { UserAuth } from '../domain-classes/user-auth';
import { CommonHttpErrorService } from '../error-handler/common-http-error.service';
import { CommonError } from '../error-handler/common-error';
import { User } from '@core/domain-classes/user';
import { Router } from '@angular/router';
import { ClonerService } from '@core/services/clone.service';
import { environment } from '@environments/environment';
import { ICompany } from '@core/domain-classes/company';
import { CurrentFinancialYearService } from '@core/services/current-financial-year.service';
import { BranchService } from 'src/app/branch/branch.service';


@Injectable(
  { providedIn: 'root' }
)
export class SecurityService {
  // securityObject: UserAuth = new UserAuth();
  private _securityObject$: BehaviorSubject<UserAuth> = new BehaviorSubject<UserAuth>(null);
  private _companyProfile$: BehaviorSubject<ICompany> = new BehaviorSubject<ICompany>(null);
  public currencyCode = 'USD';

  public get companyProfile(): Observable<ICompany> {
    return this._companyProfile$;
  }

  public get securityObject$(): Observable<UserAuth> {
    return this._securityObject$.pipe(
      map(c => {
        if (c) {
          return c;
        }
        const currenyData = localStorage.getItem('authObj');
        if (currenyData) {
          this._securityObject$.next(JSON.parse(currenyData))
          return JSON.parse(currenyData);
        }
        return null;
      })
    );
  }
  constructor(
    private http: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService,
    private router: Router,
    private clonerService: ClonerService,
    private currentFinancialYearService:CurrentFinancialYearService,
    private branchService:BranchService
  ) {

  }

  login(entity: User): Observable<UserAuth | CommonError> {
    // Initialize security object
    this.resetSecurityObject();
    return this.http.post<UserAuth>('user/login', entity)
      .pipe(
        tap((resp) => {
          localStorage.setItem('authObj', JSON.stringify(resp));
          localStorage.setItem('bearerToken', resp.bearerToken);
          this._securityObject$.next(resp);
          this.currentFinancialYearService.setFinancialYear(resp.financialYear)
          this.branchService.setBranch(resp.branch)
        })
      ).pipe(catchError(this.commonHttpErrorService.handleError));
  }

  isLogin(): boolean {
    const authStr = localStorage.getItem('authObj');
    if (authStr)
      return true;
    else
      return false;
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    localStorage.removeItem('authObj');
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('financialYear');
    localStorage.removeItem('branch');
    this._securityObject$.next(null);
    this.router.navigate(['/login']);
  }

  updateProfile(companyProfile: ICompany) {
    this.currencyCode = companyProfile.currencyCode;
    if (companyProfile.logo) {
      companyProfile.logo = `${environment.apiUrl}${companyProfile.logo}`
    }
    this._companyProfile$.next(companyProfile)
  }

  updateUserProfile(user: User) {
    const authObj: UserAuth = JSON.parse(localStorage.getItem('authObj'))
    authObj.firstName = user.firstName;
    authObj.lastName = user.lastName;
    authObj.profilePhoto = user.profilePhoto;
    authObj.phoneNumber = user.phoneNumber;
    localStorage.setItem('authObj', JSON.stringify(authObj));
    this._securityObject$.next(this.clonerService.deepClone<UserAuth>(authObj));
  }

  // This method can be called a couple of different ways
  // *hasClaim="'claimType'"  // Assumes claimValue is true
  // *hasClaim="'claimType:value'"  // Compares claimValue to value
  // *hasClaim="['claimType1','claimType2:value','claimType3']"
  // tslint:disable-next-line: typedef
  hasClaim(claimType: any, claimValue?: any): boolean {
    let ret = false;
    // See if an array of values was passed in.
    if (typeof claimType === 'string') {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      const claims: string[] = claimType;
      if (claims) {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          // If one is successful, then let them in
          if (ret) {
            break;
          }
        }
      }
    }
   // return ret;
   return true;
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    let ret = false;
    let auth: UserAuth = null;
    // Retrieve security object
    const authStr = localStorage.getItem('authObj');
    if (authStr) {
      auth = JSON.parse(authStr);
      // See if the claim type has a value
      // *hasClaim="'claimType:value'"
      if (claimType.indexOf(':') >= 0) {
        const words: string[] = claimType.split(':');
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLowerCase();
        // Either get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : 'true';
      }
      // Attempt to find the claim
      ret =
        auth.claims.find(
          (c) =>
            c.claimType && c.claimType.toLowerCase() == claimType && c.claimValue == claimValue
        ) != null;
    }
    return ret;
  }


  getUserDetail(): UserAuth {
    var userJson = localStorage.getItem('authObj');
    return JSON.parse(userJson);
  }
  getRole():string{
   // const user=this.getUserDetail();
   // return user ? user.role:null;
   const user='Branch User'
    return user;
  }
}
