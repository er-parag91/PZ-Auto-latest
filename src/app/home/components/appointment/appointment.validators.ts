import { AbstractControl, ValidationErrors } from "@angular/forms";

export class AppointmentValidators {
    static phoneValidation(control: AbstractControl):ValidationErrors|null {
        const pattern = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (!pattern.test(control.value)) return {invalidPhone: true}
        return null
    } 

    static isPastDateSelected(control: AbstractControl): ValidationErrors|null {
        const date = new Date(control.value);
        const today = new Date();
        
        // Remove the time portion from the dates
        date.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (date < today) return { isPastDateSelected : true }
        return null;
    }
}