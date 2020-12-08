import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ITrip } from 'src/app/core/interfaces/trip';
import { TripService } from 'src/app/core/services/trip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  trips$: Observable<ITrip[]>

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.trips$ = this.tripService.getTripsForHomePage();
  }
}
