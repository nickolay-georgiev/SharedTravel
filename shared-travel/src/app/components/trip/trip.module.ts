import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TripListComponent } from './trip-list/trip-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TripComponent } from './trip/trip.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripMembersComponent } from './trip-members/trip-members.component';
import { TripSearchFormComponent } from './trip-search-form/trip-search-form.component';

@NgModule({
  declarations: [
    TripCreateComponent,
    TripListComponent,
    TripComponent,
    TripDetailComponent,
    TripEditComponent,
    TripMembersComponent,
    TripSearchFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ]
})
export class TripModule { }
