import { CollectionViewer, DataSource } from "@angular/cdk/collections"
import { IPaymentTransactions } from "@core/domain-classes/payment-transactions.interface";
import { ResponseHeader } from "@core/domain-classes/response-header";
import {BehaviorSubject,Subscription,Observable, of} from  'rxjs'
import { PaymentTransactionService } from "../payment-transaction.service";
import { PaymentTransactionsResourceParameter } from "@core/domain-classes/payment-transactions.resource.parameter";
import { catchError, finalize } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
export class PaymentTransactionsDataSource implements DataSource<IPaymentTransactions>{
    private _paymentTransactionSubject$ = new BehaviorSubject<IPaymentTransactions[]>([]);
    private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
    private _loadingSubject$ = new BehaviorSubject<boolean>(false);

    public loading$ = this._loadingSubject$.asObservable()
    private _count:number = 0;
    sub$:Subscription;

    public get count():number{
        return this._count;
    }

    public responseHeader$ = this._responseHeaderSubject$.asObservable();
    constructor(private paymentTransactionsService:PaymentTransactionService) {        
    }

    connect():Observable<IPaymentTransactions[]>{
        this.sub$ = new Subscription();
        return this._paymentTransactionSubject$.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this._paymentTransactionSubject$.complete();
        this._loadingSubject$.complete();
        this.sub$.unsubscribe();
    }

    loadData(paymentTransactionResource:PaymentTransactionsResourceParameter){
        this._loadingSubject$.next(true);
        this.sub$ = this.paymentTransactionsService.getDocuments(paymentTransactionResource)
        .pipe(
            catchError(()=>of([])),
            finalize(()=>this._loadingSubject$.next(false)))
        .subscribe((resp:HttpResponse<IPaymentTransactions[]>)=>{
            if(resp&&resp.headers){
                const paginationParam = JSON.parse(
                    resp.headers.get('X-Pagination')
                ) as ResponseHeader;

                this._responseHeaderSubject$.next(paginationParam);
                const paymentTransactions = [...resp.body];
                this._count = paymentTransactions.length;
                this._paymentTransactionSubject$.next(paymentTransactions);
            }
        })
    }
}