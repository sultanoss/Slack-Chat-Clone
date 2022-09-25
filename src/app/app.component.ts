import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthentificationserviceService } from './services/authentificationservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'slackClone';
  sideBarVisible: boolean = false;
  hideSideBar :boolean = false;
  constructor(
    public authService: AuthentificationserviceService,
    public route: Router,
    public auth: AngularFireAuth
  ) {}

  logout() {
    this.authService.logout().subscribe(async () => {
      this.route.navigate(['/']);
    });
  }

  showSideBarMenu() {
    this.sideBarVisible = !this.sideBarVisible;
  }
}
