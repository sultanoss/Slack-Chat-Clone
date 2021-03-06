import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationserviceService } from '../services/authentificationservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public authService: AuthentificationserviceService,
    private route: Router,
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout().subscribe(() => {
      this.route.navigate(['/']);
    });
  }
}
