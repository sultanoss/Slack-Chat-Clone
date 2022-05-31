import { Injectable } from '@angular/core';
import { Auth, authState, onAuthStateChanged, user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@firebase/auth';
import { firstValueFrom, from, map, switchMap } from 'rxjs';
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { Router } from '@angular/router';
//import * as firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HotToastService } from '@ngneat/hot-toast';
import * as firebase from 'firebase/compat';
import { HttpHandler } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

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
    return from(this.auth.signOut());
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
    this.fireAuth.signInAnonymously().then(() => {
      const uid = this.currentUser.uid;
      console.log(uid);
      updateProfile(this.currentUser, { displayName: 'Guest' });
      this.firestore
        .collection('users')
        .doc(uid)
        .set({ userName: 'Guest', userId: uid });
    });
  }

  deleteGuestUser() {
    this.firestore
      .collection('users', (ref) => ref.where('userName', '==', 'Guest'))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log('Document successfully deleted!');
          });
        });
      });
  }
}

//   const auth = getAuth();
// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
// Existing and future Auth states are now persisted in the current
// session only. Closing the window would clear any existing state even
// if a user forgets to sign out.
// ...
// New sign-in will be persisted with session persistence.
//   return signInWithEmailAndPassword(auth, email, password);
// })
// .catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
// });

// return this.firestore
//   .collection('users', (ref) => ref.where('userName', '==', name))
//   .get()
//   .pipe(
//     map((changes) => {
//       if (!changes.empty) {
//         throw new Error('User name already exists!');
//       } else {
//         return from(
//           createUserWithEmailAndPassword(this.auth, email, password)
//         ).pipe(
//           map((userCredential) => {
//             updateProfile(userCredential.user, { displayName: name });
//             return userCredential;
//           }),
//             //create firestore user doc

//           map((userCredential) => {
//             const error2 = 'user not set'
//             this.firestore
//               .collection('users')
//               .doc(userCredential.user.uid)
//               .set({ userName: name, userId: userCredential.user.uid })
//               .then(()=>{
//                 console.log('firedoc set')
//               })
//               .catch(error2 =>{
//                 console.error(error2)
//               })
//           })
//         );
//       }
//     })
//   );
