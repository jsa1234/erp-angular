import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankTypes } from '@core/domain-classes/bank-types.interface';
import { Bank } from '@core/domain-classes/bank.interface';
import { environment } from '@environments/environment';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { switchMap, catchError, takeUntil } from 'rxjs/operators';
import { BankService } from 'src/app/accounts/bank/bank.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-pos-merchant-account-banks',
  templateUrl: './pos-merchant-account-banks.component.html',
  styleUrls: ['./pos-merchant-account-banks.component.scss']
})
export class PosMerchantAccountBanksComponent extends BaseComponent implements OnInit,OnDestroy {
  bankDetail:Bank;
  imagePath$: Observable<string> = of(environment.dummyImage);
  isLoading$:Observable<boolean> = of(false)
  private destroy$ = new Subject<void>();

  constructor( public dialogRef: MatDialogRef<PosMerchantAccountBanksComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string,
    private bankService:BankService,) {
    super();
  }

  ngOnInit(): void {
    this.getBankDetail()
  }
  onCancel(banks: Bank): void {
    this.dialogRef.close(banks);
  }
  getBankDetail():void{
    this.isLoading$ = of(true);
    this.sub$.sink = this.bankService.getSingleBank(this.data).pipe(
      switchMap((bank: Bank) => {
        this.bankDetail = bank;
        return combineLatest([
          of(bank),
          this.bankService.getAllBankTypes().pipe(
            catchError(() => of([]))
          )
        ]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(([bank, bankTypes]: [Bank, BankTypes[]]) => {
      const selectedBankDetails = bankTypes.find(x => x.value === bank.bankType);
      this.imagePath$ = this.bankService.getBankImagePath(selectedBankDetails?.fileName) || of(environment.dummyImage);;
      this.isLoading$ = of(false);
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
