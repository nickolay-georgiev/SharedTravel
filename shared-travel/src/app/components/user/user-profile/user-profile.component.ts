import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/user';

import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  editForm: FormGroup;

  subscriptions: Subscription[] = [];
  user: IUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.authService.getUserData().subscribe(user => {
      this.user = user;

      this.editForm = this.fb.group({
        firstName: [this.user.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        lastName: [this.user.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        email: [this.user.email, [Validators.email, Validators.required]],
        city: [this.user.city, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        country: [this.user.country, [Validators.required]],
        gender: [this.user.gender, [Validators.required]],
        aboutMe: [this.user.aboutMe, [Validators.nullValidator]],
        username: [this.user.username, [Validators.nullValidator]],
        age: [this.user.age, [Validators.min(14), Validators.max(99)]],
        university: [this.user.university, [Validators.minLength(5), Validators.maxLength(50)]],
        education: [this.user.education, [Validators.minLength(5), Validators.maxLength(50)]]
      })
    }));
  }

  get f() {
    return this.editForm.controls;
  }

  submitForm(): void {
    this.userService.updateUserData(this.editForm.value);
  }

  changePhoto(photo: File): void {
    this.subscriptions.push(this.userService.updateUserPhoto(photo).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
