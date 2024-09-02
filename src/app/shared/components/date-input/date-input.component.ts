import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FinancialYearInfo } from '@core/domain-classes/financial-year-info';
import { CurrentFinancialYearService } from '@core/services/current-financial-year.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent extends BaseComponent implements OnInit,OnChanges {
@Input() group:FormGroup;
@Input() controlName:FormControl
@Input() label:string
@Input() isShowLabel:boolean = true
@Input() validationMessage:string
@Input() isMandatory:boolean
@Input() isDatePickerDisabled:boolean = false
@Input() isDefaultDate:boolean = true
@Input() isCustomRange:boolean = false
@Input() defaultDate: Date | undefined;
@Input() mini: Date | undefined;
@Input() startRange: Date | undefined;
@Input() endRange: Date | undefined;
currentDate:Date = new Date()
sevenDaysAgo:Date= new Date();
minDate:Date
maxDate:Date
  currentFinancialYear: FinancialYearInfo;
  controlNameLabel: string;
  constructor(private financialYearService:CurrentFinancialYearService) { super()
    this.sevenDaysAgo.setDate(this.currentDate.getDate() - 7);
  }

  ngOnInit(): void {
    // this.getCurrentFinancialYear()

  }
  get control():FormControl{
    return this.group.get(this.controlNameLabel) as FormControl
  }
  ngOnChanges(changes:SimpleChanges): void {
    if(changes['controlName']){
      this.controlNameLabel = this.controlName.toString()
      this.control.patchValue(
        this.isDefaultDate ? this.currentDate : this.defaultDate || ''
      );      
      this.control.disable()

      if(!this.isCustomRange){
        this.getCurrentFinancialYear();
        return;
      }

      this.minDate = this.startRange ||  null;
      this.maxDate = this.endRange ||  null;
    }
  }

  getCurrentFinancialYear(){
    this.sub$.sink = this.financialYearService.currentFinancialYear$.subscribe((res:FinancialYearInfo)=>{
      this.currentFinancialYear = res
     this.minDate = new Date(this.currentFinancialYear.startDate);
     this.maxDate = new Date(this.currentFinancialYear.endDate);
    })
  }
}
