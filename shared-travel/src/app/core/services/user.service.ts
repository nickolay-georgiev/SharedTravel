import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import firebase from 'firebase/app'
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { snackBarError, snackBarInfo } from '../custom-functions/mat-snackbar-functions';

import { AuthService } from './auth.service';
import { IMessage } from '../interfaces/message';
import { IUser } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  task: AngularFireUploadTask;
  downloadURL: string;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  updateUserData(data: IUser): void {
    this.afs.collection('users').doc(this.userId).update(data).then(() => {
      snackBarInfo("User data successfully updated.", this.snackBar);
      this.router.navigate(['/user/profile']);
    }).catch((error) => {
      snackBarError(error.message, this.snackBar);
    });
  }

  updateUserPhoto(photo: File): Observable<UploadTaskSnapshot> {
    const path = `user-images/${this.userId}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, photo);
    return this.task.snapshotChanges().pipe(
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.updateUserAvatar(this.downloadURL);
      }),
    );
  }

  notifyUsers(members: string[], message: string) {
    let date = new Date().toString();
    members = members.filter(x => x !== this.userId);
    members.forEach(member => {
      this.afs.collection('users-messages').doc(member).update({
        notifications: firebase.firestore.FieldValue.arrayUnion(
          {
            description: message["value"].message,
            createdOn: date,
            creator: this.authService.userEmail
          }
        )
      }).then(() => {
        snackBarInfo("Message was sent.", this.snackBar);
      }).catch(error => {
        snackBarError(error.message, this.snackBar);
      })
    })
  }

  getUserMessages(): Observable<IMessage[]> {
    return this.afs.collection<IMessage>('users-messages').doc(this.userId)
      .snapshotChanges()
      .pipe(map(res => {
        return res.payload.data()['notifications'];
      }))
  }

  deleteUserMessage(message: IMessage) {
    this.afs.collection('users-messages').doc(this.userId).update({
      notifications: firebase.firestore.FieldValue.arrayRemove(
        message)
    }).then(() => {
      snackBarInfo("Message successfully deleted.", this.snackBar);
    }).catch((error) => {
      snackBarError(error.message, this.snackBar);
    });
  }

  private updateUserAvatar(imgUrl: string) {
    this.afs.collection<IUser>('users').doc(this.userId).update({ imgUrl: imgUrl })
      .then(() => {
        snackBarInfo("Enjoy your new photo.", this.snackBar);
        this.router.navigate(['/user/edit']);
      });
  }

  get userId() {
    return this.authService.currentUserId;
  }
}
