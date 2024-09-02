import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IJournal } from '@core/domain-classes/journal';
import { IJournalDetail } from '@core/domain-classes/journal-details';
import { SalesOrder } from '@core/domain-classes/sales-order';
import { SalesOrderItem } from '@core/domain-classes/sales-order-item';
import { SalesService } from 'src/app/sales/sales.service';
import { JournalService } from '../../journal.service';

@Component({
  selector: 'app-journal-item',
  templateUrl: './journal-item.component.html',
  styleUrls: ['./journal-item.component.scss']
})
export class JournalItemComponent implements OnInit {

  @Input() journalId: string;
  journalDetail: IJournalDetail[] = [];
  isLoading = false;
  displayedColumns: string[] = ['DrAccountName', 'CrAccountName','Amount', 'Narration'];

  constructor(private journalService: JournalService
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['journalId']) {
      this.getJournalDetail();
    }
  }

  getJournalDetail() {
    this.isLoading = true;
    this.journalService.getJournalDetail(this.journalId)
      .subscribe((data: IJournalDetail[]) => {
        this.isLoading = false;
        this.journalDetail = data;
      }, () => this.isLoading = false)
  }

}
