import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showCrDr'
})
export class ShowCrDrPipe implements PipeTransform {
  constructor() { }

  transform(balance: number, balanceDebitCredit:string): string {
        return `${balance} ${balanceDebitCredit}`
  }

}
