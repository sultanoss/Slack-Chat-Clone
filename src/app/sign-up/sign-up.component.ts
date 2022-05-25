import { Component, OnInit } from '@angular/core';
import { ActionCodeInfo, Auth, idToken, user, User } from '@angular/fire/auth';
import { idTokenResult } from '@angular/fire/compat/auth-guard';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthentificationserviceService } from '../services/authentificationservice.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {

      return {
        passwordsDontMatch: true
      }

    }
    return null  // wenn password und confirmpassword  sind gleich retur null == return kein fehler
  };
}


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {



  signUpForm = new FormGroup({

    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)

  }, { validators: passwordsMatchValidator() })


  constructor(private autService: AuthentificationserviceService,
    private toast: HotToastService,
    private route: Router,
    private firestore: AngularFirestore,
    private auth: Auth) { }

  users = [];


  ngOnInit(): void {

  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  submit() {
    if (!this.signUpForm.valid)
      return;

    const { name, email, password } = this.signUpForm.value;
    this.autService.signUp(name, email, password).pipe(
      this.toast.observe({
        success: 'Congrats! you are signed up.',
        loading: 'Signin in',
        error: ({ message }) => `${message}`
      })
    ).subscribe(() => {

      this.route.navigate(['/dashboard'])
    })

    // this.checkUserName(name, email)

    // this.firestore.collection('users').add({
    //   userName: name,
    //   userEmail: email,
    // })
  }
}


  // checkUserName(name: any, email: any) {
  //   if (
  //     this.firestore.collection('users',
  //     ref => ref.where('userName', '==', name))) {
  //     console.log('user name exist')
  //     console.log(name)
  //     this.toast.error("User Name exist.")
  //   }


