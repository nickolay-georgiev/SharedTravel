import { AbstractControl } from '@angular/forms';

export function  startDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let currentDate = new Date().setHours(0, 0, 0);
    let selectedDate = new Date(control.value).setHours(0, 0, 1);
    let endDate;

    if(control.parent){
      endDate = new Date(control.parent.controls['endDate'].value).setHours(0, 0, 0);
    }
    if (endDate <= selectedDate) {
      return { 'invalidStartDatePeriod': true }
    }
    if (selectedDate < currentDate) {
      return { 'invalidStartDate': true } 
    }
    return null;
  };

  export function endDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let startDate;
    let currentDate = new Date().setHours(0, 0, 0);
    let endDate = new Date(control.value).setHours(0, 0, 0);
    
    if(control.parent){
      startDate = new Date(control.parent.controls['startDate'].value).setHours(0, 0, 0);
    }
    if (startDate >= endDate) {
      return { 'invalidEndDatePeriod': true }
    }
    if (endDate < currentDate) {
      return { 'invalidEndDate': true }
    }
    return null;
  };