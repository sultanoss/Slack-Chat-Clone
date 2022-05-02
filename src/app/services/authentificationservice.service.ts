import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationserviceService {

  currentUser$ = authState(this.auth) // This is for switch to logout if user logged in
  currentUser: any;
  constructor(private auth:Auth, private firestore : AngularFirestore) {
    this.auth.onAuthStateChanged((user)=>{ // check user if loged in
      this.currentUser = user;
  })
  }

  login(username:string,password:string){

    return from(signInWithEmailAndPassword(this.auth,username,password));

  }

  signUp(name:string,email:string,password:string){

    return from(createUserWithEmailAndPassword(this.auth,email,password)).pipe(
      switchMap(({ user })=> updateProfile(user,{ displayName:name }) )
    );
  }

  //   async signUp(name:string,email:string,password:string){

  //  const userCredtianl = await createUserWithEmailAndPassword(this.auth,email,password);
  //  updateProfile(userCredtianl.user,{ displayName:name });
  //  this.firestore.collection("users").doc(userCredtianl.user.uid).set({
  //    name : "",
  //  })

  // }

  logout(){
    return from(this.auth.signOut());
  }
}
