import { Pipe, PipeTransform } from '@angular/core';
import { FinancialYearPhase } from '@core/domain-classes/enums/financial-year-phase .enum';

@Pipe({
  name: 'enumKeyToValue'
})
export class EnumKeyToValuePipe implements PipeTransform {

  transform(value: number): string {
    const key = FinancialYearPhase[value];
    const words = key.split('_');
    const sentenceCaseWords = words.map(word => {
      const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      return capitalizedWord.replace(/_/g, ' ');
    });
    return sentenceCaseWords.join(' ');
  }

}
