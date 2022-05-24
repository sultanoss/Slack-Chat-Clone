import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationserviceService } from '../services/authentificationservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(private autService: AuthentificationserviceService,
    private route: Router,
    private auth:Auth) { }

  ngOnInit(): void {

  }

  get email() {
    return this.resetForm.get('email');
  }

  resetPassword(){

    this.autService.resetPassword(this.resetForm.value.email)
    console.log(this.resetForm.value.email)

  }

}
