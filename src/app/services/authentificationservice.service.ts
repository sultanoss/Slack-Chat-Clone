import { Injectable } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { from, switchMap } from 'rxjs';
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationserviceService {

  currentUser$ = authState(this.auth) // This is for switch to logout if user logged in
  currentUser: any;
  constructor(private auth: Auth,
    private firestore: AngularFirestore,
    private route: Router,
    private fireAuth: AngularFireAuth,
    private toast: HotToastService) {

    this.auth.onAuthStateChanged((user) => { // check user if loged in
      this.currentUser = user;
    })

  }

  login(username: string, password: string) {


    return from(signInWithEmailAndPassword(this.auth, username, password));

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

  signUp(name: string, email: string, password: string) {

    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(({ user }) => updateProfile(user, { displayName: name }))
      );
  }

  logout() {
    return from(this.auth.signOut());
  }

  resetPassword(email: string) {

    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      this.toast.info("Please check your Email")
      this.route.navigate(['/']);
    }, err => {
     this.toast.error("This didn't work.")
    })
}

}

