import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { startDateValidator, endDateValidator } from 'src/app/core/custom-form-validation-functions/date-validators';
import { TripService } from 'src/app/core/services/trip.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css']
})
export class TripCreateComponent implements OnInit {

  groupTypes: string[];
  tripForm: FormGroup;

  testDate: number;

  constructor(private fb: FormBuilder, private tripService: TripService, private userService: UserService) { }

  ngOnInit(): void {
    this.groupTypes = ['Males only', 'Females only', 'Males and Females']

    this.tripForm = this.fb.group({
      country: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      groupSize: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      duration: this.fb.group({
        startDate: ['', [Validators.required, startDateValidator]],
        endDate: ['', [Validators.required, endDateValidator]],
      }),
      groupType: ['', [Validators.required]],
      imgPath: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
    })
  }

  submitTripForm() {
    let creatorId = this.userService.currentUserId;
    let trip = Object.assign({ creator: creatorId, members: [] }, this.tripForm.value);
    this.tripService.createTrip(trip);
    this.tripForm.reset();
  }

  get f() {
    return this.tripForm.controls;
  }

  get formIsValid() {
    return this.tripForm.status !== 'VALID';
  }

  get startDate() {
    return this.tripForm.get('duration')['controls'].startDate;
  }

  get endDate() {
    return this.tripForm.get('duration')['controls'].endDate;
  }
  
}
