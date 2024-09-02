import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bank } from '@core/domain-classes/bank.interface';
import { Observable, of } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { BankService } from '../bank.service';
import { BankTypes } from '@core/domain-classes/bank-types.interface';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.scss']
})
export class BankDetailComponent extends BaseComponent implements OnInit {
  bankDetail:Bank;
  imagePath$: Observable<string> = of('../../../../assets/images/dummy.jpg');
  constructor(private route:ActivatedRoute, private bankService:BankService) {
    super();
  }


  ngOnInit(): void {
    this.getBankDetails()
  }

  getBankDetails(): void {
    this.route.data.subscribe(
      (data: { resolvedBankData: [Bank, BankTypes[]] }) => {
        if (!data.resolvedBankData) 
          return;
          const [bank, bankTypes] = data.resolvedBankData;
          this.bankDetail = { ...bank };
          const selectedBankDetails = bankTypes.find(x=>x.value == bank.bankType)
          this.imagePath$ = this.bankService.getBankImagePath(selectedBankDetails.fileName);

      }
    );
  }
  


}
