import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { AuthentificationserviceService } from './services/authentificationservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'slackClone';
  sideBarVisible: boolean = false;
  hideSideBar: boolean = false;
  public screenWidth: any;
  public screenHeight: any;

  constructor(
    public authService: AuthentificationserviceService,
    public route: Router,
    public auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (window.innerWidth >= 650) {
      this.sideBarVisible = false;
    }
  }

  logout() {
    this.authService.logout().subscribe(async () => {
      this.route.navigate(['/']);
    });
  }

  showSideBarMenu() {
    this.sideBarVisible = !this.sideBarVisible;
  }
}
