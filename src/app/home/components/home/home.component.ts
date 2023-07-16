import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as AOS from 'aos'
import SwiperCore, { Autoplay, Navigation, Pagination,A11y  } from 'swiper';
import { AppointmentComponent } from '../appointment/appointment.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppointmentValidators } from '../appointment/appointment.validators';

SwiperCore.use([Autoplay, Navigation, Pagination, A11y ]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form = new FormGroup({
      Name: new FormControl('', Validators.required),
      Phone: new FormControl('', AppointmentValidators.phoneValidation),
      Email: new FormControl('', [Validators.email]),
      Subject: new FormControl(''),
      Message: new FormControl(''),
  });
  isSubmitted: Boolean = false;

  constructor(private modalService: NgbModal, private http: HttpClient) {
    
  }

  ngOnInit(): void {
    AOS.init({
      duration: 900,
      disable: 'mobile',
      once: true,
      offset: 0,
      startEvent: 'DOMContentLoaded',
      delay: 150,
      anchorPlacement: 'top-center',
    });    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh()
    }, 500)
  }
  

  swiperHappyConfig: any = {    
    slidesPerView: 2,                
    loop: true,
    spaceBetween: 20,    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    allowTouchMove: true,
    speed: 500,        		
		mousewheelControl: true,
		keyboardControl: true,
    autoHeight: true, 
    breakpoints: {
      1025: {
        slidesPerView: 2
      },      
      0: {
        slidesPerView: 1
      }
    }

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

  //Coupon
  openRedeemDialog(content:any) {
		this.modalService.open(content, { 
      size: 'lg', centered: true, scrollable: true 
    });
	}
  
  //our Services
  openServicesDialog(services:any) {
		this.modalService.open(services, { 
      size: 'lg', 
      modalDialogClass: 'services-modal',  
      centered: true, 
      scrollable: true, 
    });
	}
  onSubmit() {
    const contactFormData = {
      Name:this.form.value.Name,
      Phone:this.form.value.Phone,
      Email:this.form.value.Email,
      Subject: this.form.value.Subject,
      Message: this.form.value.Message
    }
    this.http.post('https://formspree.io/f/mnqknavp', contactFormData).subscribe(
      response => this.isSubmitted = true,
      error => console.error(error)
    )
  }
}
