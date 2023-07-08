import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarsMakesModalsYears } from './data';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  vehicleYears: number[] = [];
  brandlist:string[] = [];
  modellist:string[] = [];
  minDate: string | undefined;

  constructor(public dialog: NgbActiveModal) {

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
    console.log(year); 
    this.brandlist = [
      ...new Set(CarsMakesModalsYears.filter(
          carObject => carObject.start_year <= year && (carObject.end_year === '-' || year <= carObject.end_year)
          ).map(
              carObject => carObject.make
              ))].sort()
  }
  changebrand(year: any, make:any ) {    
    this.modellist = CarsMakesModalsYears.filter(
        carObject => carObject.start_year <= year 
        && (carObject.end_year === '-' || year <= carObject.end_year) 
        && carObject.make === make
    ).map(carObject => carObject.model);
  }

  saveRecord() {
    if (this.dialog) {
      this.dialog.close();
    }
  }

}
