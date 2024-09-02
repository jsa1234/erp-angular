import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { JournalService } from '../journal.service';
import { IJournal } from '@core/domain-classes/journal';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageJournalResolver implements Resolve<IJournal> {
  constructor(private vs: JournalService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IJournal> | null {
    const id =  route.paramMap.get('id');
    if(id == 'add'){
    return null;
    }

    return this.vs.getSingleJournalDetail(id).pipe(
      take(1),
      mergeMap(journal => {
        if (journal) {
          return of(journal);
        } else {
          this.router.navigate(['/journal']);
          return null;
        }
      })
    );
  }
}
