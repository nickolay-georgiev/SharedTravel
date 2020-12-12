import { Router } from "@angular/router";
import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app'

import { from, Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IUser } from '../interfaces/user';
import { snackBarError, snackBarInfo } from '../custom-functions/mat-snackbar-functions';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnDestroy {

  userId: string;
  email: string;
  isLogged: boolean = false;
  subscriptions: Subscription[] = [];
  user: firebase.User;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.subscriptions.push(this.afAuth.user.subscribe((data => {
      if (data) {
        this.userId = data.uid;
        this.email = data.email;
        this.isLogged = true;
      }
    })));
  }

  updateEmail(email): Observable<void> {
    return from(this.user.updateEmail(email));
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setUser();
        snackBarInfo("Successfully logged in.", this.snackBar);
        this.router.navigate(['/home']);
      }).catch((error) => {
        snackBarError(error.message, this.snackBar);
      })
  }

  signUp(email: string, password: string, user: IUser) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        user = Object.assign(user, { uid: result.user.uid });
        this.setUserData(user);
        snackBarInfo("Successfully register.", this.snackBar);
        this.router.navigate(['/home']);
      }).catch((error) => {
        snackBarError(error.message, this.snackBar);
      })
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.isLogged = false;
      localStorage.removeItem('user');
      snackBarInfo("Successfully logged out.", this.snackBar);
      this.router.navigate(['/home']);
    }).catch((error) => {
      snackBarError(error.message, this.snackBar);
    })
  }

  setUser(): void {
    this.subscriptions.push(this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', user.uid);
      }
    }))
  }

  getUserData(): Observable<IUser> {
    return this.afAuth.user.pipe(switchMap(user => {
      this.user = user;
      this.userId = user.uid;
      return this.afs
        .doc<IUser>('users/' + user.uid)
        .valueChanges();
    }))
  }

  private setUserData(user) {
    let avatar = 'https://firebasestorage.googleapis.com/v0/b/travel-c6c41.appspot.com/o/images%2Fmale-avatar.png?alt=media&token=adde1893-9f70-4ee9-aa9d-dfe258073828';
    if (user.gender === 'Female') {
      avatar = 'https://firebasestorage.googleapis.com/v0/b/travel-c6c41.appspot.com/o/images%2Ffemale-avatar-12-774634.webp?alt=media&token=231131f9-fc7b-413c-b4ff-222a8dd1a7c5';
    }

    this.afs.collection('users-messages').doc(user.uid).set({ 'notifications': [] });
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);
    const userState: IUser = {
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      city: user.city,
      country: user.country,
      username: user.email,
      aboutMe: '',
      age: null,
      university: null,
      education: null,
      imgUrl: avatar
    }
    return userRef.set(userState, {
      merge: true
    })
  }

  get currentUserId() {
    return this.userId;
  }

  get userEmail() {
    return this.email;
  }

  get isLoggedIn(): boolean {
    return this.isLogged;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe())
  }
}