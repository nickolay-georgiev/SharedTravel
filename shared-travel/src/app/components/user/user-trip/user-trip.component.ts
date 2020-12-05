import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { TripService } from 'src/app/core/services/trip.service';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ITrip } from 'src/app/core/interfaces/trip';
import { UserNotificationFormComponent } from '../user-notification-form/user-notification-form.component';

@Component({
  selector: 'app-user-trip',
  templateUrl: './user-trip.component.html',
  styleUrls: ['./user-trip.component.css']
})

export class UserTripComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['rowNumber', 'country', 'city', 'groupType', 'duration.startDate', 'duration.endDate', 'groupSize', 'progress', 'actions'];
  dataSource = new MatTableDataSource<any>();
  subscriptions: Subscription[] = [];
  userId: string;
  tripMembers: string;

  constructor(
    private tripService: TripService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = this.authService.currentUserId;
    this.tripService.getUserTrips(this.userId).subscribe(response => {
      this.dataSource.data = response;
    });

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'duration.startDate': return new Date(item.duration.startDate);
        case 'duration.endDate': return new Date(item.duration.endDate);
        default: return item[property];
      }
    };
  }

  viewTripDetails(trip, event) {
    if (event.target.tagName == 'BUTTON') { return };
    let path = this.router.url.endsWith('joins') ? '/user/joins' : '/user/trip';
    this.router.navigate([path, trip.id]);
  }

  openDialog(trip: ITrip) {
    const dialogRef = this.dialog.open(UserNotificationFormComponent);
    this.subscriptions.push(dialogRef.afterClosed().subscribe(message => {
      this.userService.notifyUsers(trip.members, message);
    }));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe);
  }
}
