import { FormGroup } from "@angular/forms";

export function EnableOrDisableFormControl(controlNames: string[], form: FormGroup, isEnable: boolean): void {
  controlNames.forEach((controlName) => {
    const control = form.controls[controlName];
    isEnable ? control.enable() : control.disable();
  });
}
