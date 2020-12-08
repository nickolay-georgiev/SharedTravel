import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 
  user$: Observable<IUser>;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.authService.getUserData();
  }

  logoutHandler(): void {
    this.authService.signOut();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
