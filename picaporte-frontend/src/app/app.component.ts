import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from './api-service/user/user.service';
import { AuthorizeStructure } from './structures/auth0/authorize.struture';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'picaporte-frontend';
  showSplashScreen = true;

  constructor(public auth: AuthService, public userService: UserService) {}

  async ngOnInit() {
    
    await this.auth.isLoading$;


    await this.auth.isAuthenticated$.subscribe(async (authenticated) => {
      console.log(authenticated);

      if (authenticated) {
        this.showSplashScreen = false;
      } else {
        await this.auth.loginWithRedirect({
          redirect_uri: 'http://localhost:4200/'
        });
  
        await this.auth.handleRedirectCallback();
  
        var authorizeStructure: AuthorizeStructure = new AuthorizeStructure();
  
        await this.auth.getAccessTokenSilently().subscribe(val => authorizeStructure.accessToken = val);
        await this.auth.getUser().subscribe(val => authorizeStructure.email = val?.email);
  
        await this.userService.Post_AuthorizeUser(authorizeStructure).subscribe((data: {}) => {
          var isValid = <boolean>data;
          if (!isValid) {
            this.auth.logout({
              returnTo: 'http://localhost:4200/'
            });
          }
        });
      }
    });
  }
}
