import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router'
import { UserService } from '../services/user.service';

@Injectable()
export class UserMessagesResolver implements Resolve<boolean> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.userService.getUserMessages();
        return true;
    }
}