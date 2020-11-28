import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user$: Observable<IUser>;
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUserData();
  }   

  logoutHandler(){
    this.authService.signOut();
  }

  get isLoggedIn(): boolean {   
    return this.authService.isLoggedIn;
  }

}
