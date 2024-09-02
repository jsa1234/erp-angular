import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TransactionModeArray, TransactionModeMapping } from '@core/domain-classes/enums/transaction-mode-enum';

@Component({
  selector: 'app-transaction-mode-dropdown',
  templateUrl: './transaction-mode-dropdown.component.html',
  styleUrls: ['./transaction-mode-dropdown.component.scss']
})
export class TransactionModeDropdownComponent implements OnInit,OnChanges {
  @Input() group:FormGroup
  @Input() controlName:FormControl
  @Input() isMandatory:boolean = true
  transactionModes:TransactionModeMapping[] = TransactionModeArray
  controlNameLabel:string
  constructor() { }

  ngOnInit(): void {
    this.controlNameLabel = this.controlName.toString();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['controlName']) {
      this.controlNameLabel = this.controlName.toString();
    }
  }

}
