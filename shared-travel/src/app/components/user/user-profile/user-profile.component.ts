import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/User';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  editForm: FormGroup;

  userDataSubscriptions: Subscription[] = [];
  user: IUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userDataSubscriptions.push(this.authService.getUserData().subscribe(user => {
      this.user = user;
     
      this.editForm = this.fb.group({
        firstName: [this.user.firstName, [Validators.nullValidator]],
        lastName: [this.user.lastName, [Validators.nullValidator]],
        email: [this.user.email, [Validators.email, Validators.required]],
        city: [this.user.city, [Validators.nullValidator]],
        country: [this.user.country, [Validators.nullValidator]],
        gender: [this.user.gender, [Validators.nullValidator]],
        aboutMe: [this.user.aboutMe, [Validators.nullValidator]],
        username: [this.user.username, [Validators.nullValidator]],
        age: [this.user.age, [Validators.nullValidator]],
        university : [this.user.university, [Validators.nullValidator]],
        education: [this.user.education, [Validators.nullValidator]]
      })
    }));
  }

  get f() {
    return this.editForm.value;
  }

  submitForm(): void {
    this.userService.updateUserData(this.editForm.value);
  }

  changePhoto(photo: File): void {
    this.userDataSubscriptions.push(this.userService.updateUserPhoto(photo).subscribe());
  }

  ngOnDestroy(): void {
    this.userDataSubscriptions.forEach(x => x.unsubscribe());
  }
}
