import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static PasswordMatchValidator(control: AbstractControl) {
    const password: string = control.get('loginPin')?.value; // get password from our password form control
    const confirmPassword: string = control.get('confirmLoginPin')?.value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmLoginPin')?.setErrors({ passwordMismatch: true });
    }
    
  }
}
