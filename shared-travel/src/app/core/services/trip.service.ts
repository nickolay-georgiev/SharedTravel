import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Params, Router } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ITrip } from '../interfaces/Trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  trips: ITrip[] = [];
  test: any;

  constructor(public db: AngularFirestore, private router: Router) { }

  filterFunctions = {
    'Males only': (trips: ITrip[]): ITrip[] => trips.filter(x => x.groupType === 'Males only'),
    'Females only': (trips: ITrip[]): ITrip[] => trips.filter(x => x.groupType === 'Females only'),
    'Males and Females': (trips: ITrip[]): ITrip[] => trips,
    'Filter By': (trips: ITrip[]): ITrip[] => trips,
  }

  createTrip(trip: ITrip) {
    trip.country = trip.country.toLowerCase();
    trip.city = trip.city.toLowerCase();
    trip.duration.startDate = new Date(trip.duration.startDate);
    trip.duration.endDate = new Date(trip.duration.endDate);
    return this.db.collection<ITrip>('trips').add(trip)
      .then((data) => {
        // this.snackbar.open('Question added!', 'Undo', {
        //   duration: 2000
        // });
        this.router.navigate(['/user/trip']);
      })
      .catch((err) => {
        console.log(err);
      });;
  }

  getAllTrips(): Observable<ITrip[]> {
    return this.db.collection<ITrip>('trips', ref => ref
      .orderBy('duration.startDate', 'asc'))
      .snapshotChanges()
      .pipe(map(response => {
        if (!response.length) {
          console.log("No Data Available");
        }
        this.trips = [];
        for (let item of response) {
          const trip = item.payload.doc.data();
          trip.id = item.payload.doc.id;
          this.trips.push(trip);
        }
        return this.trips;

      }, error => {
      }));
  }
}