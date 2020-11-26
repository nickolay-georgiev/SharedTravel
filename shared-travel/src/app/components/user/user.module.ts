import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoreModule } from 'src/app/core/core.module';
import { UserUploadPhotoComponent } from './user-upload-photo/user-upload-photo.component';
import { UserEditComponent } from './user-edit/user-edit.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserEditComponent,
    UserUploadPhotoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,   
  ]
})
export class UserModule { }
