import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AccountVoucherDetails } from '@core/domain-classes/account-voucher-details';

import { VoucherService } from '../../voucher.service';

@Component({
  selector: 'app-payment-vocher-item',
  templateUrl: './payment-vocher-item.component.html',
  styleUrls: ['./payment-vocher-item.component.scss'],
})
export class PaymentVocherItemComponent implements OnInit, OnChanges {
  @Input() voucherId: string;
  voucherDetail: AccountVoucherDetails[] = [];
  isLoading = false;
  displayedColumns: string[] = [
    'accountHeadNameEnglish',
    // 'accountHeadNameArabic',
    'description',
    'amount',
  ];

  constructor(private voucherService: VoucherService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['voucherId']) {
      this.getVoucherDetailsItems();
    }
  }

  getVoucherDetailsItems() {
    this.isLoading = true;
    this.voucherService.getVouchertDetails(this.voucherId).subscribe(
      (data: AccountVoucherDetails[]) => {
        this.isLoading = false;
        this.voucherDetail = data;
      },
      () => (this.isLoading = false)
    );
  }
}
