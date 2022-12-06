import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './api-service/user/user.service';
import { AuthenticationService } from './authentication-service/authentication.service';
import { AuthorizeStructure } from './structures/auth0/authorize.struture';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'picaporte-frontend';
  showSplashScreen = true;

  constructor(public auth: AuthService, public authenticationService: AuthenticationService) {}
  async ngOnInit() {
    await this.auth.isLoading$.subscribe((isLoading) => {
      if (!isLoading) {
        this.auth.isAuthenticated$.subscribe((authenticated) => {
          if (authenticated) {
            this.auth.buildAuthorizeUrl({
              redirect_uri: 'http://localhost:4200/'
            }).subscribe((data) => {
              console.log("token", data);
              this.authenticationService.authorizeUser().then(data => {
                this.showSplashScreen = false;
              });
            })
          } else {
            this.auth.loginWithRedirect({
              redirect_uri: 'http://localhost:4200/'
            });
          }
        });
      }      
    })
  }
}
