import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from '@environments/environment';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe  implements PipeTransform {
  private readonly customFormat: string = environment.dateFormat; 

  constructor(private currencyPipe: DatePipe) {
  }
  transform(value: string|Date, format?: string): string {
    const desiredFormat = format || this.customFormat;
    return this.currencyPipe.transform(value, desiredFormat);
  }
}
