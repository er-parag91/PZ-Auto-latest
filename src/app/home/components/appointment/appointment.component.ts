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

  saveRecord() {
    if (this.dialog) {
      this.dialog.close();
    }
  }

  onSubmit = () => {
    console.log(this.form, {
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
    })

    this.http.get('https://formspree.io/f/xayzrngw').subscribe(
      response => console.log(response)
    )
  }
}
