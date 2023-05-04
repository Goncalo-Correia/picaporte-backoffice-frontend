import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'picaporte-frontend';
  showSplashScreen = true;
  redirectUri = environment.redirectUri;

  constructor(public auth: AuthService, public authenticationService: AuthenticationService) {}
  async ngOnInit() {
    await this.auth.isLoading$.subscribe((isLoading) => {
      if (!isLoading) {
        this.auth.isAuthenticated$.subscribe((authenticated) => {
          if (authenticated) {
            this.authenticationService.authorizeUser().then(data => {
              this.showSplashScreen = false;
            });
          } else {
            this.auth.loginWithRedirect();
          }
        });
      }      
    })
  }
}
