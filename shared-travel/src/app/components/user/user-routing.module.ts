import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMessagesResolver } from 'src/app/core/resolvers/user-messages-resolver';
import { TripDetailComponent } from '../trip/trip-detail/trip-detail.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserTripComponent } from './user-trip/user-trip.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'profile' },
    { path: 'profile', component: UserProfileComponent },
    { path: 'edit', component: UserProfileComponent },
    { path: 'trip', component: UserTripComponent },
    { path: 'trip/:id', component: TripDetailComponent },
    { path: 'joins/:id', component: TripDetailComponent },
    { path: 'joins', component: UserTripComponent },
    { path: 'messages', component: UserMessagesComponent, resolve: [UserMessagesResolver] },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [UserMessagesResolver]
})
export class UserRoutingModule {
}
