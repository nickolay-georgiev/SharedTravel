import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TripService } from 'src/app/core/services/trip.service';


import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITrip } from 'src/app/core/interfaces/trip';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<any>();
  
  data: ITrip[];
  page: number = 0;
  initialPageSize: number = 5;

  subscriptions: Subscription[] = [];
  trips: ITrip[] = [];

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.tripService.getAllTrips().subscribe(response => {
      this.setDataTest(response);
    }));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getByFilters(form: { country: string, city: string, filterBy: string }) {
    this.tripService.getTripsByFilter(form).subscribe(res => {
      this.trips = res;
      this.dataSource.data = this.trips;
      this.initialPageSize = this.paginator.pageSize;
      this.setPaginatorData({ pageIndex: this.page, pageSize: this.initialPageSize });
    });
  }

  resetFormHandler(){
    this.subscriptions.push(this.tripService.getAllTrips().subscribe(response => {
      this.setDataTest(response);
    }));
  }

  setPaginatorData(obj: { pageIndex: number, pageSize: number }) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;

    this.data = this.trips.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

  private setDataTest(response){
    this.trips = response;
    this.dataSource.data = this.trips;
    this.setPaginatorData({ pageIndex: this.page, pageSize: this.initialPageSize });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
