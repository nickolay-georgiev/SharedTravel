import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TripListComponent } from './trip-list/trip-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TripComponent } from './trip/trip.component';


@NgModule({
  declarations: [
    TripCreateComponent,
    TripListComponent,
    TripComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class TripModule { }
