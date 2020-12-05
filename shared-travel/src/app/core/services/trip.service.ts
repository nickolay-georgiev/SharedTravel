import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import firebase from 'firebase'
import { ITrip } from '../interfaces/trip';


@Injectable({
  providedIn: 'root'
})
export class TripService {
  trips: ITrip[] = [];

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

  // getUsersById(users) {
  //   this.db.collection('users', ref => ref
  //     .where('__name__', 'in', users))
  //     .snapshotChanges()
  //     .subscribe(res => {
  //       debugger
  //     })
  // }

  getTripById(tripId: string): Observable<any> {
    return this.db.collection<ITrip>('trips').doc(tripId).snapshotChanges()
      .pipe(
        switchMap((params: Params) => {
          if (!params) {
            console.log("No Data Available");
          }
          let id = params.payload.id;
          let members = params.payload.data().members;
          if (members.length == 0) { members.push('empty') };
          return forkJoin([of({ id, ...params.payload.data() }),
          this.db.collection('users', ref => ref
            .where('__name__', 'in', members))
            .get()])
        }
        ))

  }

  getUserTrips(userId) {
    let url = this.router.url;
    if (url.endsWith('trip')) {
      return this.getTripsByUserIdWithProgress(userId);
    } else {
      return this.getTripsWhereUserIsMember(userId);;
    }
  }

  getTripsWhereUserIsMember(id: string) {
    return this.db.collection<ITrip>('trips', ref => ref
      .where('members', 'array-contains', id))
      .get()
      .pipe(map(res => {
        return res.docs.map(doc => {
          let data = doc.data();
          let endDate = new Date(data.duration.endDate);
          let currentDate = new Date();
          return Object.assign(data, { progress: endDate <= currentDate, id: doc.id })
        });
      }))
  }

  getTripsByUserIdWithProgress(id: string) {
    return this.db.collection<ITrip>('trips', ref => ref.
      where('creator', '==', id))
      .get()
      .pipe(map(res => {
        return res.docs.map(doc => {
          let data = doc.data();
          let endDate = new Date(data.duration.endDate);
          let currentDate = new Date();
          return Object.assign(data, { progress: endDate <= currentDate, id: doc.id })
        });
      }))
  }

  updateTrip(id: string, trip) {
    return this.db.collection<ITrip>('trips').doc(id).update(trip);
  }

  deleteTrip(id: string) {
    return this.db.collection<ITrip>('trips').doc(id).delete().then(() => {
      //this.trip = null;
      this.router.navigate(['/trip/list'])
    });;
  }

  getTripsByFilter(form: { country: string, city: string, filterBy: string }): Observable<ITrip[]> {
    let country = form.country.toLowerCase().trim();
    let city = form.city.toLowerCase().trim();
    let filterBy = form.filterBy;

    if (!country && !city && filterBy === 'Filter By') { return of(this.trips) };
    if (!country && !city && filterBy) { return of(this.filterFunctions[filterBy](this.trips)) }

    return this.searchOptions(country, city)
      .pipe(map(response => {
        if (!response.length) {
          console.log("No Data Available");
        }
        this.trips = [];
        for (let item of response) {
          const trip = item.payload.doc.data() as ITrip;
          trip.id = item.payload.doc.id;
          this.trips.push(trip);
        }
        return this.filterFunctions[filterBy](this.trips);
      }, error => {
      }));
  }

  // ----------------------------------------------------------------------------------------

  getTripsForHomePage(): Observable<ITrip[]> {
    return this.db.collection<ITrip>('trips', ref => ref
      .orderBy('duration.startDate', 'asc')
      .limit(6))
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

  getAllTrips(): Observable<ITrip[]> {
    return this.db.collection<ITrip>('trips', ref => ref
      .orderBy('duration.startDate', 'desc'))
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

  searchOptions(country, city) {
    if (country && city) {
      return this.db.collection('trips', ref => {
        return ref
          .where('country', '==', country)
          .where('city', '==', city)
      }).snapshotChanges();
    } else if (city && !country) {
      return this.db.collection('trips', ref => {
        return ref
          .where('city', '==', city)
      }).snapshotChanges();
    } else if (country && !city) {
      return this.db.collection('trips', ref => {
        return ref
          .where('country', '==', country)
      }).snapshotChanges();
    }
  }

   searchOptionsTest(country, city) {
    if (country && city) {
      return this.db.collection<ITrip>('trips', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (country && city) { query = query.where('country', '==', country).where('city', '==', city) };
        if (city && !country) { query = query.where('city', '==', city) };
        if (country && !city) { query = query.where('country', '==', country) };
        return query;
      }).snapshotChanges();
    }
  }
}