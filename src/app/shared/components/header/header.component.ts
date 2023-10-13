import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollService } from '../../services/scroll.services';
import { AppointmentComponent } from 'src/app/home/components/appointment/appointment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isThankYouPage: Boolean = false;

  //public currentActive = 1;
  selectedTab: any = 1;
 
  constructor(private modalService: NgbModal, private scrollService: ScrollService, private router: Router) { }

  ngOnInit(): void {
    if(this.router.url.includes('thankyou')) {
      this.isThankYouPage = true;
    }
  }

  menuToggle() {
    document.querySelector("body")?.classList.toggle('menuOpen');
  }

  scrollToId(event:any, id: string) {
    var elems = document.querySelector(".active");
    if(elems){
      elems.classList.remove("active");
    }
    event.currentTarget.classList.add('active');
    document.querySelector("body")?.classList.toggle('menuOpen');
    this.scrollService.scrollToElementById(id);
  }

  //Appointment Modal
  appointmentDialog() {
    const title = 'Create ';
    const modelRef = this.modalService.open(AppointmentComponent, {
      size: 'md', 
      centered: true, 
      scrollable: true, 
      backdrop: 'static',
      keyboard: false,
    });
    modelRef.componentInstance.title = title;
	}

}
