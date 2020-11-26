import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  task: AngularFireUploadTask;

  userId: string;
  downloadURL: string;

  constructor(private afs: AngularFirestore, private router: Router, private storage: AngularFireStorage) {
    this.userId = localStorage.getItem('user');
  }

  getUserData(): Observable<IUser> {
    return this.afs
      .doc<IUser>('users/' + this.userId)
      .valueChanges();
  }

  updateUserData(data: IUser): void {
    this.afs.collection('users').doc(this.userId).update(data).then(() => {
      this.router.navigate(['/user']);
    });
  }

  get isLoggedIn(): boolean {
    return !!this.userId;
  }

  get currentUserId(): string {
    return this.userId ? this.userId : null;
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
  
  private updateUserAvatar(imgUrl: string) {
    this.afs.collection('users').doc(this.userId).update({ imgUrl: imgUrl }).then(() => {
      this.router.navigate(['/user/edit']);
    });
  }
}
