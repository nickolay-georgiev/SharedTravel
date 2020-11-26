import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { TransformUsernamePipe } from './pipes/transform-username.pipe';
import { HideElementDirective } from './directives/hide-element.directive';
import { ReadOnlyDirective } from './directives/read-only.directive';

@NgModule({
  declarations: [
    TransformUsernamePipe,
    ReadOnlyDirective,
    HideElementDirective,
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  exports: [
    TransformUsernamePipe,
    ReadOnlyDirective,
    HideElementDirective,
  ]
})
export class CoreModule { }
