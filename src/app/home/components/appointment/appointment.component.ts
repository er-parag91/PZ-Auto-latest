import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarsMakesModalsYears } from './data';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  vehicleYears: number[] = [];
  brandlist:string[] = [];
  modellist:string[] = [];
  constructor(public dialog: NgbActiveModal) { }


  ngOnInit(): void {
    // loop over json object and get all year then remove duplicate years and sort it to show options from latest to oldest years
    this.vehicleYears = [
        ...new Set(CarsMakesModalsYears.map(
                carObject => carObject.start_year
                ))].sort((a, b) => b - a)



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
