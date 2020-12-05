import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanLoad, Route, UrlSegment, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.afAuth.authState
        .pipe(map(user => {
            if (user) {
                return true;
            }
            this.router.navigate(['/login']);
            return false;
        }));
    }

    canLoad(route: Route, segments: UrlSegment[]) {
        return this.afAuth.authState
            .pipe(map(user => {
                if (user) {
                    return true;
                }
                this.router.navigate(['/login']);
                return false;
            }));
    }
} 