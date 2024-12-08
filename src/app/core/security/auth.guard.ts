import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  CanLoad,
  Route
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private securityService: SecurityService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.securityService.isLogin()) {
      // let claimType: string = next.data["claimType"];
      // if (claimType) {
      //   if (!this.securityService.hasClaim(claimType)) {
      //     this.toastr.error(`You don't have right to access this page`);
      //     this.router.navigate(['access-denied']);
      //     return false;
      //   }
      // }
      // const userRole = this.securityService.getRole();
      // if(userRole === 'Branch User'){
      //   const restrictedPaths = ['product', 'products'];
      //   const currentPath = this.getFullPath(next);
      //   if (restrictedPaths.some(restrictedPath => currentPath.includes(restrictedPath))) {
      //     this.toastr.error(`You don't have the right to access this page`);
      //     this.router.navigate(['access-denied']);
      //     return false;
      //   }
      // }
    } 
    else {
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.securityService.isLogin()) {
      let claimType: string = next.data["claimType"];
      if (claimType) {
        if (!this.securityService.hasClaim(claimType)) {
          this.toastr.error(`You don't have right to access this page `);
          return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }
  canLoad(route: Route): boolean {
    if (this.securityService.isLogin()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  private getFullPath(route: ActivatedRouteSnapshot): string {
    let path = route.routeConfig?.path || '';
    if (route.parent) {
      path = this.getFullPath(route.parent) + '/' + path;
    }
    return path.replace(/\/\/+/g, '/').replace(/^\/|\/$/g, '');
  }
}
