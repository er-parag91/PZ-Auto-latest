import { Component, OnInit } from '@angular/core';
import { BookedAppointmentDetailService } from 'src/app/shared/services/booked-appointment-detail.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  appointmentDateAndTime: string | null = null;

  constructor(private BookedAppointmentDetailService: BookedAppointmentDetailService) { }

  ngOnInit(): void {
    this.appointmentDateAndTime = this.BookedAppointmentDetailService.getAppointmentDateAndTime();
  }

}
