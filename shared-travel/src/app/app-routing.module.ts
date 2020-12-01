import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TripCreateComponent } from './components/trip/trip-create/trip-create.component';
import { TripDetailComponent } from './components/trip/trip-detail/trip-detail.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/profile', component: UserProfileComponent },
  { path: 'user/edit', component: UserProfileComponent },
  { path: 'trip/create', component: TripCreateComponent },
  { path: 'trip/list', component: TripListComponent },
  { path: 'trip/list/:id', component: TripDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
