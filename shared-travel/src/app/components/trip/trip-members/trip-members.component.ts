import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/user';


@Component({
  selector: 'app-trip-members',
  templateUrl: './trip-members.component.html',
  styleUrls: ['./trip-members.component.css',]
})
export class TripMembersComponent {
  @Input()
  user: IUser  

  @Input()
  isCreator: boolean;
  constructor() { }
}