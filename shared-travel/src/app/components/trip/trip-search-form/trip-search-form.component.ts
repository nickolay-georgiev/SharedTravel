import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trip-search-form',
  templateUrl: './trip-search-form.component.html',
  styleUrls: ['./trip-search-form.component.css']
})
export class TripSearchFormComponent implements OnInit {

  @Output()
  searchFormOptionsEmitter = new EventEmitter();
  
  @Output()
  resetFormEmitter = new EventEmitter();

  searchForm: FormGroup;
  searchOptions: string[];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchOptions = ['Males only', 'Females only', 'Males and Females'];
    this.searchForm = this.fb.group({
      country: [''],
      city: [''],
      filterBy: ['Filter By'],
    });
  }

  submitSearchForm() {   
    this.searchFormOptionsEmitter.emit(this.searchForm.value);
  }

  resetForm(){
    this.resetFormEmitter.emit();
  }
}
