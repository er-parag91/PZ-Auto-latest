import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentValidators } from './appointment.validators';
import { CarsMakesModalsYears } from './data';
import { HttpClient } from '@angular/common/http';
import { BookedAppointmentDetailService } from '../../../shared/services/booked-appointment-detail.service';
import { Router } from '@angular/router';

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
  isSubmitted: Boolean = false;

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
  constructor(public dialog: NgbActiveModal, private http: HttpClient, private BookedAppointmentDetailService: BookedAppointmentDetailService, private router: Router) {
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
  
    const shopOpeningAt = 9; // store open time
    const shopClosingAt = 18; // store close time

    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1)
    selectedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
    if (selectedDate.getTime() < today.getTime()) {
      this.appointmentHours = []; // Return empty array for past dates
    }
  
    const startTime = new Date(selectedDate);
    startTime.setHours(shopOpeningAt, 0, 0);
  
    const endTime = new Date(selectedDate);
    endTime.setHours(shopClosingAt, 0, 0);

     // Appointment interval of 30 minutes
    const appointmentDurationMinutes = 30; 
    const appointmentHours = [];
  
    let currentTime = new Date(startTime);
  
    // If the date is today, start from the current time
    if (selectedDate.getTime() === today.getTime()) {
      currentTime = new Date(); // Use the current time
      // if current time is earlier than shop opening time, set it to shop open time to generate appt for only office hours
      if (currentTime.getHours() < shopOpeningAt) currentTime.setHours(shopOpeningAt, 0, 0) 
    }
  
  
    // Round the current time to the nearest 30-minute interval
    const remainderMinutes = currentTime.getMinutes() % appointmentDurationMinutes;
    if (remainderMinutes !== 0) {
      currentTime.setMinutes(currentTime.getMinutes() + (appointmentDurationMinutes - remainderMinutes));
    }
  
    while (currentTime < endTime) {
      const hour = currentTime.getHours();
      const minute = currentTime.getMinutes();
  
      // Format hour and minute strings with leading zeros
      const formattedHour = (hour > 12 ? hour % 12 : hour).toString().padStart(2, '0');
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

    this.http.post('https://formspree.io/f/mleydrba', formData).subscribe(
      response => this.isSubmitted = true,
      error => console.error(error)
    )

    this.BookedAppointmentDetailService.setAppointmentDateAndTime(this.form.value.Date || null, this.form.value.Time || null);
    this.close();
    this.router.navigate(['thankyou']);
  }
}
