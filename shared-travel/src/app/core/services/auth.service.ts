import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IUser } from '../interfaces/User';



@Injectable({
  providedIn: 'root'
})

export class AuthService {  

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) { }

  setUser(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) { 
        localStorage.setItem('user', user.uid);
      }
    })
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);       
        this.setUser();
        this.router.navigate(['/home']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  signUp(email: string, password: string, user: IUser) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {        
        user = Object.assign(user, { uid: result.user.uid });
        this.setUserData(user);
        this.router.navigate(['/login']);
      }).catch((error) => {
        window.alert(error.message)
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

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }

  private setUserData(user) {
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
      imgUrl: 'https://firebasestorage.googleapis.com/v0/b/travel-c6c41.appspot.com/o/images%2Ffemale-avatar.jpg?alt=media&token=8a949dd8-a782-4f8e-ac51-25cdff2cb598',
    }
    return userRef.set(userState, {
      merge: true
    })
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/home']);
    })
  } 
}