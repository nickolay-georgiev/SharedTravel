import { Component, Input } from '@angular/core';
import { ITrip } from 'src/app/core/interfaces/trip';

@Component({
  selector: 'app-home-page-trip',
  templateUrl: './home-page-trip.component.html',
  styleUrls: ['./home-page-trip.component.css']
})
export class HomePageTripComponent {

  @Input()
  trip: ITrip;

  constructor() { }
  
}
