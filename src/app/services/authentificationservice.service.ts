import { Injectable } from '@angular/core';
import { Auth, authState, onAuthStateChanged, user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@firebase/auth';
import { first, firstValueFrom, from, map, of, switchMap } from 'rxjs';
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationserviceService {
  currentUser$ = authState(this.auth); // This is for switch to logout if user logged in
  currentUser: any;

  constructor(
    private auth: Auth,
    private firestore: AngularFirestore,
    private route: Router,
    private fireAuth: AngularFireAuth,
    private toast: HotToastService
  ) {
    this.auth.onAuthStateChanged((user) => {
      // check user if loged in
      this.currentUser = user;
    });
  }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  async signUp(name: string, email: string, password: string) {
    try {
      const allSameName = await firstValueFrom(
        this.firestore
          .collection('users', (ref) => ref.where('userName', '==', name))
          .valueChanges()
      );
      if (allSameName.length != 0) {
        throw new Error('User name already exists!');
      }

      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      const newFirestorUser = {
        userName: name,
        userId: userCredential.user.uid,
      };
      await this.firestore
        .collection('users')
        .doc(userCredential.user.uid)
        .set(newFirestorUser);
    } catch (error: any) {
      console.error(error);
      if (error.message) throw new Error(error.message);
      else throw new Error(error);
    }
  }

  logout() {
    if (this.currentUser.isAnonymous) {
      return from(this.deleteGuest());
    } else {
      return from(this.auth.signOut());
    }
  }

  resetPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(
      () => {
        this.toast.info('Please check your Email');
        this.route.navigate(['/']);
      },
      (err) => {
        this.toast.error("This didn't work.");
      }
    );
  }

  guestSignIn() {
    this.fireAuth.signInAnonymously().then(async () => {
      const uid = this.currentUser.uid;
      await updateProfile(this.currentUser, { displayName: 'Guest' });
      this.firestore
        .collection('users')
        .doc(uid)
        .set({ userName: 'Guest', userId: uid })
        .then(() => {
          this.route.navigate(['/dashboard']);
        });
    });
  }

  async deleteGuest() {
    this.deleteGuestChat();
    this.deleteGuestThread();
    this.deleteGuestDirectmessage();
    this.deleteGuestDirectchat();

    try {
      await this.firestore
        .collection('users')
        .doc(this.currentUser?.uid)
        .delete();

      await this.currentUser?.delete();
    } catch (error: any) {
      console.error(error);
      throw Error('Error Deleting Guest User: ' + error.message);
    }
  }

  deleteGuestChat() {
    this.firestore
      .collection('chats', (ref) =>
        ref.where('authorId', '==', this.currentUser.uid)
      )
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
          });
        });
      });
  }

  deleteGuestThread() {
    this.firestore
      .collection('threads', (ref) =>
        ref.where('authorId', '==', this.currentUser.uid)
      )
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
          });
        });
      });
  }

  deleteGuestDirectmessage() {
    this.firestore
      .collection('directMessages', (ref) =>
        ref.where('authorId', '==', this.currentUser.uid)
      )
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
          });
        });
      });
  }

  deleteGuestDirectchat() {
    this.firestore
      .collection('directChats', (ref) =>
        ref.where('authorId', '==', this.currentUser.uid)
      )
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
          });
        });
      });
  }
}

