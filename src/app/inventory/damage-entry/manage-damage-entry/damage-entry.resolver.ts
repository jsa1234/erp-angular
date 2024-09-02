import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { IDamageEntry } from '@core/domain-classes/damage-entry.interface';
import { Observable, of } from 'rxjs';
import { DamageEntryService } from '../damage-entry.service';
import { LoaderService } from '@shared/services/loader.service';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DamageEntryResolver implements Resolve<IDamageEntry> {
  constructor(
    private damageEntryService: DamageEntryService,
    private router: Router,
    private loader: LoaderService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDamageEntry> | null {
    const id = route.paramMap.get('id');
    if (id === 'add') {
      return null;
    }
    this.loader.show();
    return this.damageEntryService.getDamageEntryById(id).pipe(
      take(1),
      mergeMap((damageEntry) => {
        if (damageEntry) {
          this.loader.hide();
          return of(damageEntry);
        } else {
          this.router.navigate(['/inventory/damage-entry']);
          this.loader.hide();
          return null;
        }
      })
    );
  }
}
