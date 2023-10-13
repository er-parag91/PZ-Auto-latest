import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { ThankYouLayoutComponent } from './components/thank-you-layout/thank-you-layout.component';
import { ThankyouComponent } from '../thankyou/thankyou.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DefaultLayoutComponent,
    ThankYouLayoutComponent,
    ThankyouComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DefaultLayoutComponent,
    SwiperModule,
  ]
})
export class SharedModule { }
