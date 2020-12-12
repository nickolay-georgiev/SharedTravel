import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-notification-form',
  templateUrl: './user-notification-form.component.html',
  styleUrls: ['./user-notification-form.component.css']
})
export class UserNotificationFormComponent implements OnInit {

  messageForm: FormGroup;

  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.messageForm = this.fb.group({
      message: ['']
    });
  }

}
