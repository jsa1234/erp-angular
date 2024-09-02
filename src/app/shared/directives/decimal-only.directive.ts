
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type="text"][appDecimalOnly], input[type="number"][appDecimalOnly]'
})

export class DecimalOnlyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent) {
    const initialValue = this.el.nativeElement.value;
    let newValue = initialValue.replace(/[^0-9.]+/g, '') // allow only digits and dots
                                 .replace(/\.(?=.*\.)/g, '') // remove repeated dots
                                 .replace(/^(\d*\.\d*)\..*/g, '$1'); // remove dots after the first dot

  // Add zero before the dot if it's the first character
  if (newValue.startsWith('.')) {
    newValue = '0' + newValue;
  }

    if (newValue !== initialValue) {
      this.el.nativeElement.value = newValue;
      event.stopPropagation();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const initialValue = this.el.nativeElement.value;
    const dotPressed = event.key === '.' || event.key === 'Decimal';
    const hasSingleDot = initialValue.split('.').length === 2;
    const eKeyPressed = event.key.toLowerCase() === 'e';
  
    // Allow dot key press if it's a number input and there's no dot yet
    if (this.el.nativeElement.type === 'number' && dotPressed && !hasSingleDot) {
      return;
    }
  
    // Block the dot and 'e' key press for other input types
    if ((dotPressed || eKeyPressed) && (hasSingleDot || eKeyPressed)) {
      event.preventDefault();
    }
  }
  
  
}
