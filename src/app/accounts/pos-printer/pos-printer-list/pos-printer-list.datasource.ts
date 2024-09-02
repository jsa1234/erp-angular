import { DataSource } from "@angular/cdk/collections";
import { HttpResponse } from "@angular/common/http";
import { POSPrinterResourceParameter } from "@core/domain-classes/pos-printer-resource-parameter";
import { POSPrinter } from "@core/domain-classes/pos-printer.interface";
import { ResponseHeader } from "@core/domain-classes/response-header";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { PosPrinterService } from "../pos-printer.service";

export class POSPrinterDataSource implements DataSource<POSPrinter> {

    private _posPrinterSubject$ = new BehaviorSubject<POSPrinter[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private _count: number = 0;
    sub$: Subscription;
    public get count(): number {
        return this._count;
      }

      public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

      constructor(private posPrinterService: PosPrinterService) {
    }

    connect(): Observable<POSPrinter[]> {
        this.sub$ = new Subscription();
        return this._posPrinterSubject$.asObservable();
      }
    
      disconnect(): void {
        this._posPrinterSubject$.complete();
        this.loadingSubject.complete();
        this.sub$.unsubscribe();
      }
     
      loadData(posPrinterResource: POSPrinterResourceParameter) {
        this.loadingSubject.next(true);
        this.sub$ = this.posPrinterService.getPOSPrinterList(posPrinterResource).pipe(
          tap(() => this.loadingSubject.next(false)),
          map((resp: HttpResponse<POSPrinter[]>) => {
            const { headers } = resp;
            const paginationParam = JSON.parse(headers.get('X-Pagination')) as ResponseHeader;
            this._responseHeaderSubject$.next(paginationParam);
            const posPrinterLists = resp.body || []
            this._count = posPrinterLists.length;
            return posPrinterLists;
          }),
          catchError(() => of([]))
        ).subscribe((posPrinterLists:POSPrinter[]) => {
          this._posPrinterSubject$.next(posPrinterLists);
        });
      }
    
}


