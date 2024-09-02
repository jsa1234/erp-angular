import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { NativeDateAdapter } from "@angular/material/core";
import { environment } from "@environments/environment";

export const PICK_FORMATS = {
    parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
    display: {
        dateInput: 'input',
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'}
    }
  };

  @Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
          return formatDate(date,environment.dateFormat,this.locale);;
      } else {
          return date.toDateString();
      }
  }
}
