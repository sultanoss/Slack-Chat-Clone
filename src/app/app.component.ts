import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationserviceService } from './services/authentificationservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slackClone';

  constructor(public authService: AuthentificationserviceService,
    public route: Router ) { }


    logout() {

      this.authService.logout().subscribe(() => {
        this.route.navigate(['/']);
      })
    }
}
