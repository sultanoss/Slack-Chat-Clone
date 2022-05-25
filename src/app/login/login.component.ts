import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthentificationserviceService } from '../services/authentificationservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({

    //  Reactive form validation

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)

  });

  constructor(public authService: AuthentificationserviceService,
    private toast: HotToastService,
    private route: Router,) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email'); // email variable wird definiert
  }

  get password() {
    return this.loginForm.get('password');// password variable wird definiert
  }


  submit(){

    console.log(this.email);
    console.log(this.password);

    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged in successfuly',
        loading: 'Logging in',
        error: 'There was an error'
      })
    ).subscribe(() => {

      this.route.navigate(['/dashboard']);
    })
  }

  }

