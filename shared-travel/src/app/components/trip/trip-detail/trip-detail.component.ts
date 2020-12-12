import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { TripService } from 'src/app/core/services/trip.service';

import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['../trip/trip.component.css', './trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {

  subscriptions: Subscription[] = [];

  tripId: string;
  trip: any;
  isCreator: boolean;
  userId: string;
  isTripMember: boolean;
  previousUrl: string = '';
  tripMembers: any;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.currentUserId;
    this.tripId = this.route.snapshot.params.id;

    this.tripService.getTripById(this.tripId).subscribe(([trip, members]) => {
      this.trip = trip;
      if (!this.tripId) { return; }
      if (this.trip) {
        this.isCreator = this.trip.creator === this.userId;
        this.isTripMember = this.trip.members.some(x => x === this.userId);
      } else {
        this.isCreator = false;
      }
      this.tripMembers = members.docs.map(member => { return { ...member.data() } });
    })
  }

  updateTripDetails(data): void {
    this.tripService.updateTrip(this.tripId, data);
  }

  joinTrip(): void {
    this.trip.members.push(this.userId);
    this.tripService.updateTrip(this.tripId, { members: this.trip.members });
  }

  leaveTrip(): void {
    this.trip.members = this.trip.members.filter(x => x !== this.userId);
    if (this.isCreator) {
      this.tripService.updateTrip(this.tripId, { members: this.trip.members, creator: null });
    } else {
      this.tripService.updateTrip(this.tripId, { members: this.trip.members });
    }
  }

  deleteTrip(): void {
    this.tripService.deleteTrip(this.tripId);
    this.tripId = undefined;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
