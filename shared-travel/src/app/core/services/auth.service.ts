import { Router } from "@angular/router";
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { IUser } from '../interfaces/User';


@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnDestroy {

  userId: string;
  email: string;
  isLogged: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.subscriptions.push(this.afAuth.user.subscribe((data => {
      if (data) {
        this.userId = data.uid;
        this.email = data.email;
        this.isLogged = true;
      }
    })));
  }

  setUser(): void {
    this.subscriptions.push(this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', user.uid);
      }
    }))
  }


  getUserData(): Observable<IUser> {
    // return this.afAuth.onAuthStateChanged(user => ....);
    return this.afAuth.user.pipe(switchMap(user => {
      this.userId = user.uid;
      return this.afs
        .doc<IUser>('users/' + user.uid)
        .valueChanges();
    }))
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setUser();
        this.router.navigate(['/home']);
      }).catch((error) => {
        console.log(error);
      })
  }

  signUp(email: string, password: string, user: IUser) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        user = Object.assign(user, { uid: result.user.uid });
        this.setUserData(user);
        this.router.navigate(['/home']);
      }).catch((error) => {
        console.log(error);
      })
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
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

  signOut() {
    this.afAuth.signOut().then((res) => {
      this.isLogged = false;
      localStorage.removeItem('user');
      this.router.navigate(['/home']);
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe())
  }
}