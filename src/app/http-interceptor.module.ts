import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '@environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private router: Router, private toastrService: ToastrService) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = localStorage.getItem('bearerToken');
    const baseUrl = environment.apiUrl;
    const timezone = new Date().getTimezoneOffset()
    if (req.url.lastIndexOf('i18n') > -1 ||  req.url.includes('/assets/json/')||  req.url.includes('/assets/excel/') ) {
      return next.handle(req);
    }
    const url = req.url.lastIndexOf('api') > -1 ? req.url : 'api/' + req.url;
    if (token) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token).set('Access-Control-Allow-Origin','*').set('X-Timezone-Offset',`${timezone}`).set('ngrok-skip-browser-warning',`${123}`),
        url: `${baseUrl}${url}`,
      });
      return next.handle(newReq).pipe(
        tap(
          () => { },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['login']);
              } 
              else if (err.status == 403){
                this.toastrService.error("Access Denied", "", {
                  enableHtml: true
                });
              }
              else if (err.error) {
                this.toastrService.error(err.error.join(" </br> "), "", {
                  enableHtml: true
                });
              } 
              else {
                this.toastrService.error(err.message, "", {
                  enableHtml: true
                });
              }
            }
          }
        )
      );
    } else {
      const newReq = req.clone({
        headers: req.headers.set('Access-Control-Allow-Origin','*'),
        url: `${baseUrl}${url}`
       
      });
      return next.handle(newReq).pipe(
        tap(
          () => { },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['login']);
              }
              if (err.status === 403) {
                this.router.navigate(['login']);
              }
              if (err.status === 409) {
                this.toastrService.error(err.error.messages[0])
              }
            }
          }
        )
      );
    }
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
})
export class HttpInterceptorModule { }
