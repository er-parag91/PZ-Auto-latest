import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { AppointmentComponent } from './components/appointment/appointment.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    HomeComponent,
    AppointmentComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    SwiperModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class HomeModule { }
