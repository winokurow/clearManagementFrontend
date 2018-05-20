import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    /*static MatchPassword(AC: AbstractControl) {
        if (AC.get('password').valuev!=null) && (AC.get('confirmpassword').value!=null))
        {
            let password = AC.get('password').value; // to get value in input tag
            let confirmPassword = AC.get('confirmpassword').value; // to get value in input tag
                if (password !== confirmPassword) {
                    AC.get('confirmPassword').setErrors( {MatchPassword: true} );
                } else {
                    console.log('true');
                    return null;
                }
        } else {
            return null;
        }

    }
*/
    static MatchPassword(AC: AbstractControl): { invalid: boolean } {
        if (AC.get('password').value !== AC.get('confirmpassword').value) {
            return {invalid: true};
        }
    }
}