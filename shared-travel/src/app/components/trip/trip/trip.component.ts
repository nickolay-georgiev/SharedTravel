import { Component, Input } from '@angular/core';
import { ITrip } from 'src/app/core/interfaces/trip';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent {

  @Input() trip: ITrip;

  constructor() { }
}
