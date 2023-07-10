import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentValidators } from './appointment.validators';
import { CarsMakesModalsYears } from './data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  vehicleYears: number[] = [];
  brandlist:string[] = [];
  modellist:string[] = [];
  minDate: string | undefined;
  appointmentHours: string[] = [];

  form = new FormGroup({
    Name: new FormControl('', Validators.required),
    Phone: new FormControl('', AppointmentValidators.phoneValidation),
    Email: new FormControl('', Validators.email),
    'Vehicle Year': new FormControl(''),
    Brand: new FormControl(''),
    Model: new FormControl(''),
    Coupon : new FormControl(''),
    'Reason For Appointment': new FormControl(''),
    Date: new FormControl('', AppointmentValidators.isPastDateSelected),
    Time: new FormControl('', Validators.required),
  })
  constructor(public dialog: NgbActiveModal, private http: HttpClient) {
   }


  ngOnInit(): void {
    // loop over json object and get all year then remove duplicate years and sort it to show options from latest to oldest years
    this.vehicleYears = [...new Set(CarsMakesModalsYears.map(carObject => carObject.start_year))].sort((a, b) => b - a);

    
      // Get today's date
      const today = new Date();

      // Format the date to yyyy-mm-dd
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      this.minDate = `${yyyy}-${mm}-${dd}`;

  }

  close() {
    if (this.dialog) {
      this.dialog.close();
    }
  }

  changeyear(year:any) {   
    this.brandlist = [
      ...new Set(CarsMakesModalsYears.filter(
          carObject => carObject.start_year <= year && (carObject.end_year === '-' || year <= carObject.end_year)
          ).map(
              carObject => carObject.make
              ))].sort();
    this.brandlist.push('Other');
  }
  changebrand(year: any, make:any ) {    
    this.modellist = CarsMakesModalsYears.filter(
        carObject => carObject.start_year <= year 
        && (carObject.end_year === '-' || year <= carObject.end_year) 
        && carObject.make === make
    ).map(carObject => carObject.model).sort()
    this.modellist.push('Other')
  }

  onDateSelected = (date: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00
  
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1)
    selectedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
    if (selectedDate.getTime() < today.getTime()) {
      this.appointmentHours = []; // Return empty array for past dates
    }
  
    const startTime = new Date(selectedDate);
    startTime.setHours(9, 0, 0); // Set start time to 9:00 AM
  
    const endTime = new Date(selectedDate);
    endTime.setHours(18, 0, 0); // Set end time to 6:00 PM
  
    const appointmentDurationMinutes = 30;
    const appointmentHours = [];
  
    let currentTime = new Date(startTime);
    // Check if the current date is today
    const currentDate = new Date();
    currentDate.setHours(9, 0, 0);
  
    // If the date is today, start from the current time
    if (selectedDate.getTime() === today.getTime()) {
      currentTime = new Date(); // Use the current time
    }
  
  
    // Round the current time to the nearest 30-minute interval
    const remainderMinutes = currentTime.getMinutes() % appointmentDurationMinutes;
    if (remainderMinutes !== 0) {
      currentTime.setMinutes(currentTime.getMinutes() + (appointmentDurationMinutes - remainderMinutes));
    }
  
    while (currentTime <= endTime) {
      const hour = currentTime.getHours();
      const minute = currentTime.getMinutes();
  
      // Format hour and minute strings with leading zeros
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
  
      const appointmentTime = `${formattedHour}:${formattedMinute} ${hour >= 12 ? 'PM' : 'AM'}`;
      appointmentHours.push(appointmentTime);
  
      // Increment time by the appointment duration
      currentTime.setTime(currentTime.getTime() + appointmentDurationMinutes * 60000);
    }
  
    this.appointmentHours = appointmentHours;
  }

  saveRecord() {
    if (this.dialog) {
      this.dialog.close();
    }
  }

  onSubmit = () => {
    const formData = {
      Name:this.form.value.Name,
      Phone:this.form.value.Phone,
      Email:this.form.value.Email,
      'Vehicle Year':this.form.value['Vehicle Year'],
      Brand:this.form.value.Brand,
      Model:this.form.value.Model,
      Coupon :this.form.value.Coupon ,
      'Reason For Appointment':this.form.value['Reason For Appointment'],
      Date:this.form.value.Date,
      Time:this.form.value.Time,
    };

    this.http.post('https://formspree.io/f/xayzrngw', formData).subscribe(
      response => console.log(response),
      error => console.error(error)
    )
  }
}
