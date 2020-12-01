import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { endDateValidator, startDateValidator } from 'src/app/core/custom-form-validation-functions/date-validators';
import { TripService } from 'src/app/core/services/trip.service';



@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {

  @Input() trip: any;
  @Output() editTripEmitter = new EventEmitter();
  @Output() leaveTripEmitter = new EventEmitter();
  @Output() deleteTripEmitter = new EventEmitter();

  tripEditForm: FormGroup;
  groupTypes: string[];
  membersCount: number;
  currentDate: Date = new Date();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    let startDate = new Date(this.trip.duration.startDate);
    let endDate = new Date(this.trip.duration.endDate);

    this.membersCount = this.trip.members.length;
    this.groupTypes = ['Males only', 'Females only', 'Males and Females']
      .filter(x => x !== this.trip.groupType);

    this.tripEditForm = this.fb.group({
      country: [this.trip.country, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      city: [this.trip.city, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      groupSize: [this.trip.groupSize, [Validators.required, Validators.min(1), Validators.max(1000)]],
      duration: this.fb.group({
        startDate: [this.trip.duration.startDate, [Validators.required, startDateValidator]],
        endDate: [this.trip.duration.endDate, [Validators.required, endDateValidator]],
      }),
      groupType: [this.trip.groupType, [Validators.required]],
      imgPath: [this.trip.imgPath, [Validators.required]],
      description: [this.trip.description, [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
    })
  }

  get f() {
    return this.tripEditForm.controls;
  }

  get formIsValid() {
    return this.tripEditForm.status !== 'VALID';
  }

  get formIsDisabled() {
    return this.tripEditForm.status !== 'DISABLED';
  }

  get startDate() {
    return this.tripEditForm.get('duration')['controls'].startDate;
  }

  get endDate() {
    return this.tripEditForm.get('duration')['controls'].endDate;
  }

  get tripStartDate() {
    return new Date(this.tripEditForm.get('duration')['controls'].startDate.value);
  }

  get tripEndDate() {
    return new Date(this.tripEditForm.get('duration')['controls'].endDate.value);
  }

  submitEditForm() {
    this.editTripEmitter.emit(this.tripEditForm.value);
  }

  leaveTrip() {
    this.leaveTripEmitter.emit();
  }

  deleteTrip() {
    this.deleteTripEmitter.emit();
  }

}
