import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripListComponent } from './trip-list/trip-list.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'create' },
    { path: 'create', component: TripCreateComponent },
    { path: 'list', component: TripListComponent },
    { path: 'list/:id', component: TripDetailComponent },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TripRoutingModule {
}
