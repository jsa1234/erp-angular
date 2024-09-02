import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { Observable, throwError } from 'rxjs';  // Import throwError
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonErrorHandlerService implements ErrorHandler {

  constructor(private httpClient: HttpClient) { }

  handleError(error: any): Observable<any> {
    if (environment.production) {
      const obj = {
        errorMessage: (<Error>error).message,
        stack: (<Error>error).stack
      };
      return this.saveErrorLog(obj).pipe(
        catchError(err => {
          console.error('Error logging failed:', err);
          return throwError(err);  // Re-throw the error after logging
        })
      );
    } else {
      console.error(error);
      return throwError(error);  // Re-throw the error
    }
  }

  saveErrorLog(obj: any): Observable<any> {
    return this.httpClient.post<void>('nlog', obj);
  }
}
