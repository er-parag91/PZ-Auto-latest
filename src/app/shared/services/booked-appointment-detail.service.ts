import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookedAppointmentDetailService {
  bookedAppointmentDetail: string|null = '.';

  constructor() {}

   setAppointmentDateAndTime(date: string | null, time: string | null) {
    if (date && time) {
      this.bookedAppointmentDetail = ` on ${date} at ${time}.`;
    }
   };

   getAppointmentDateAndTime () {
    return this.bookedAppointmentDetail;
   };
}
