import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '@core/domain-classes/user';
import { catchError } from 'rxjs/operators';
import { Role } from '@core/domain-classes/role';
import { Country } from '@core/domain-classes/country';
import { City } from '@core/domain-classes/city';
import { Industry } from '@core/domain-classes/industry';
import { DocumentAuditTrail } from '@core/domain-classes/document-audit-trail';
import { ReminderFrequency, reminderFrequencies } from '@core/domain-classes/reminder-frequency';
import { ReminderScheduler } from '@core/domain-classes/reminder-scheduler';
import { SendEmail } from '@core/domain-classes/send-email';
import { CustomReminderScheduler } from '@core/domain-classes/custom-reminder-scheduler';
import { ModuleReference } from '@core/domain-classes/module-reference';
import { Currency } from '@core/domain-classes/currency';

@Injectable({ providedIn: 'root' })
export class CommonService {
  constructor(
    private httpClient: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }


    private _currentUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    public get currentUrl$() : Observable<string> {
      return this._currentUrl$.asObservable();
    }

    setCurrentUrl(url){
      this._currentUrl$.next(url);
    }

  getAllUsers(): Observable<User[] | CommonError> {
    const url = `user/getAllUsers`;
    return this.httpClient.get<User[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getRoles(): Observable<Role[] | CommonError> {
    const url = `role`;
    return this.httpClient.get<Role[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getCountry() {
    const url = `Country`;
    return this.httpClient.get<Country[]>(url);
  }
  getCity(countryId: string, cityName: string) {
    const url = `City?countryId=${countryId}&&cityName=${cityName}`;
    return this.httpClient.get<City[]>(url);
  }

  getCityByName(countryName: string, cityName: string) {
    const url = `City/countryName?countryName=${countryName}&&cityName=${cityName}`;
    return this.httpClient.get<City[]>(url);
  }
  getIndustries(): Observable<Industry[]> {
    return this.httpClient.get<Industry[]>('industry');
  }

  getUsers(): Observable<User[] | CommonError> {
    const url = `user/GetUsers`;
    return this.httpClient.get<User[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }
  addDocumentAuditTrail(documentAuditTrail: DocumentAuditTrail): Observable<DocumentAuditTrail> {
    return this.httpClient.post<DocumentAuditTrail>('documentAuditTrail', documentAuditTrail);
  }

  getReminderFrequency(): Observable<ReminderFrequency[]> {
    return of(reminderFrequencies);
  }

  getUserNotificationCount(): Observable<number> {
    return this.httpClient.get<number>('user/notification/count');
  }
  getTop10UserNotification(): Observable<ReminderScheduler[]> {
    return this.httpClient.get<ReminderScheduler[]>('reminder/notofication/top10');
  }
  sendEmail(sendEmail: SendEmail): Observable<boolean> {
    return this.httpClient.post<boolean>('sendEmail/suppliers', sendEmail);
  }
  addReminderSchedule(customReminderScheduler: CustomReminderScheduler) {
    return this.httpClient.post<boolean>('ReminderScheduler', customReminderScheduler);
  }
  getReminderSchedulers(moduleReference: ModuleReference): Observable<ReminderScheduler[]> {
    const url= `ReminderScheduler/${moduleReference.application}/${moduleReference.referenceId}`;
    return this.httpClient.get<ReminderScheduler[]>(url);
  }

  getCurrencies(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>('Currency');
  }
  validateTextBox(event: any, type: string): any {
    let charCode = event.charCode || event.keyCode || event.which;

    if (type === 'number') {
      return (charCode >= 48 && charCode <= 57) || charCode === 8 || charCode === 32;
    }
    if (type === 'decimal') {
      return (charCode >= 48 && charCode <= 57) || charCode === 8 || charCode === 32 || charCode === 46;
    }
    if (type === 'characters') {
      return (
        (charCode >= 65 && charCode <= 90) ||     // Uppercase letters
        (charCode >= 97 && charCode <= 122) ||    // Lowercase letters
        charCode === 8 || charCode === 32         // Backspace or space
      );
    }
    if (type === 'charactersWithDot') {
      return (
        (charCode >= 65 && charCode <= 90) ||     // Uppercase letters
        (charCode >= 97 && charCode <= 122) ||    // Lowercase letters
        charCode === 8 || charCode === 32 || charCode === 46    // Backspace or space or dot
      );
    }
    if (type === 'NoSpecialCharacters') {
      return (
        (charCode >= 65 && charCode <= 90) ||     // Uppercase letters
        (charCode >= 97 && charCode <= 122) ||    // Lowercase letters
        (charCode >= 48 && charCode <= 57) ||     // Numbers
        charCode === 8 || charCode === 32         // Backspace or space
      );
    }
    if (type === 'characterswoSpace') {
      return (
        (charCode >= 65 && charCode <= 90) ||     // Uppercase letters
        (charCode >= 97 && charCode <= 122) ||    // Lowercase letters
        charCode === 8          //  space
      );
    }
    if (type === 'numberwospace') {
      return (charCode >= 48 && charCode <= 57) || charCode === 8;
    }


    if (type === 'alphanumeric') {
      return true
    }
  }
  validateRequiredFields(form: any, id: any) {
     let inputField = document.getElementById(id) as HTMLInputElement;
     let minLength = inputField.getAttribute('minlength');
     if (!form.controls[id].value || (minLength && form.controls[id].value.length < minLength)) {
       inputField.classList.add("error");
     } else {
       inputField.classList.remove("error");
     }
     
   }
  authenticateEmail(data: any) {
    if (data != "" && data != undefined) {
      var emailreg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailreg.test(String(data).toLowerCase())) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

}
