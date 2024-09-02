import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { IJournal } from "@core/domain-classes/journal";
import { Observable, of } from "rxjs";
import { take ,mergeMap} from "rxjs/operators";
import { JournalService } from "../journal.service";
import { LoaderService } from "@shared/services/loader.service";

@Injectable()
export class JournalDetailResolverService implements Resolve<IJournal> {
  constructor(private cs: JournalService, private router: Router, private loader:LoaderService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IJournal> | null {
    const id = route.paramMap.get('id');
    this.loader.show()
    return this.cs.getSingleJournalDetail(id).pipe(
      take(1),
      mergeMap(journal => {
        if (journal) {
          this.loader.hide();
          return of(journal);
        } else {
          this.router.navigate(['/journal']);
          this.loader.hide();
          return null;
        }
      })
    );
  }
}