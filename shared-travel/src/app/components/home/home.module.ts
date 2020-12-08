import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { HomePageTripComponent } from './home-page-trip/home-page-trip.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomePageTripComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class HomeModule { }
