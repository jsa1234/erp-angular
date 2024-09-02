import { ValidatorFn, AbstractControl } from '@angular/forms';

export const reorderMaxValidator: ValidatorFn = (control: AbstractControl): {[key: string]: any} | null => {
  const reorderLevel = control.get('reorderLevel');
  const maxStockLevel = control.get('maxStockLevel');
  //Convert the string value to number using unary operator(+)
  const reorderLevelValue:number = +reorderLevel.value
  const maxStockLevelValue:number = +maxStockLevel.value

  // If both fields are not mandatory, allow empty values
  if (!reorderLevelValue && !maxStockLevelValue) {
    return null;
  }

  // // If only one of the fields has a value, return an error
  // if ((!reorderLevelValue && maxStockLevelValue) || (reorderLevelValue && !maxStockLevelValue)) {
  //   return { 'missingFields': true };
  // }

  // If reorder level is greater than max stock level, return an error
  if (reorderLevelValue > maxStockLevelValue) {
    return { 'reorderMaxError': true };
  }

  return null;
};
