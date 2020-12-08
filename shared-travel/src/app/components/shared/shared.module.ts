import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    NavComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    NavComponent
  ]
})
export class SharedModule { }
