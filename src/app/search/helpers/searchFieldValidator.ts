import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function searchFieldValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let forbidden = false;
    if (control.value == '')
      return null;
    if (control.value.indexOf(' ') >= 0)
      return { forbiddenSpaces: { value: control.value } };
    forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenChars: { value: control.value } } : null;
  };
}
