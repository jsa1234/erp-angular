import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AccountVoucherDetails } from '@core/domain-classes/account-voucher-details';

import { ReceiptService } from '../../receipt.service';

@Component({
  selector: 'app-payment-receipt-item',
  templateUrl: './payment-receipt-item.component.html',
  styleUrls: ['./payment-receipt-item.component.scss'],
})
export class PaymentReceiptItemComponent implements OnInit, OnChanges {
  @Input() receiptId: string;
  receiptDetail: AccountVoucherDetails[];
  isLoading = false;
  displayedColumns: string[] = [
    'accountHeadNameEnglish',
    // 'accountHeadNameArabic',
    'description',
    'amount',
  ];

  constructor(private receiptService: ReceiptService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receiptId']) {
      this.getReceiptDetailsItems();
    }
  }

  getReceiptDetailsItems() {
    this.isLoading = true;
    this.receiptService.getReceiptDetails(this.receiptId).subscribe(
      (data: AccountVoucherDetails[]) => {
        this.isLoading = false;
        this.receiptDetail = data;
      },
      () => (this.isLoading = false)
    );
  }
}
