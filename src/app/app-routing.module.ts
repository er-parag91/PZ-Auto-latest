import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './shared/components/default-layout/default-layout.component';
import { ThankYouLayoutComponent } from './shared/components/thank-you-layout/thank-you-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m=>m.HomeModule)
      }, 
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m=>m.HomeModule)
      },       
    ]
  },
  {
    path: 'thankyou',
    component: ThankYouLayoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
