import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable({
    providedIn: 'root',
  })
export class UserResolver implements Resolve<boolean> {

    constructor(private authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.authService.getUserData();
        return true;
    }
}