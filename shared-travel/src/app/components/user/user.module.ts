import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoreModule } from 'src/app/core/core.module';
import { UserUploadPhotoComponent } from './user-upload-photo/user-upload-photo.component';
import { UserTripComponent } from './user-trip/user-trip.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserNotificationFormComponent } from './user-notification-form/user-notification-form.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserMessageComponent } from './user-message/user-message.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserUploadPhotoComponent,
    UserTripComponent,
    UserNotificationFormComponent,
    UserMessagesComponent,
    UserMessageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,   
    UserRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatDialogModule,
    MatExpansionModule
  ]
})
export class UserModule { }
