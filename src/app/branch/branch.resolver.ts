import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { IBranch } from '@core/domain-classes/branch';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { BranchService } from './branch.service';

@Injectable({
  providedIn: 'root'
})
export class BranchResolver implements Resolve<IBranch> {
  constructor(private cs: BranchService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBranch> {
    const id = route.paramMap.get('id');
    if (id === 'add') {
      return null;
    }

    return this.cs.getSingleBranch(id).pipe(
      take(1),
      mergeMap(branch => {
        if (branch) {
          return of(branch);
        } else {
          this.router.navigate(['/branch']);
          return null;
        }
      })
    );



  }
}
