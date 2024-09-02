import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
  }
  @Input() label: string = '';
  @Input() isChecked: boolean = false;
  @Input() checkboxColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() isDisabled: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onCheckboxChange() {
    this.checkedChange.emit(this.isChecked);
  }
}
