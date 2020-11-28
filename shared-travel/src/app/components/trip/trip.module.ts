import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TripCreateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class TripModule { }
