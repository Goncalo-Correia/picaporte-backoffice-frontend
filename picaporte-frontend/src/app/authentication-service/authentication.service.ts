import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { UserService } from '../api-service/user/user.service';
import { AuthorizeStructure } from '../structures/auth0/authorize.struture';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public auth: AuthService, public userService: UserService) { }

  authenticateUser() {
    this.auth.isLoading$.subscribe((data: {}) => {
      this.auth.loginWithRedirect({
        redirect_uri: environment.redirectUri
      });
    });
  }

  authorizeUser() {
    return new Promise((resolve, reject) => {
      this.auth.isLoading$.subscribe(isLoading => {
        if (!isLoading) {
          this.auth.isAuthenticated$.subscribe(isAuthenticated => {
            if (isAuthenticated) {
              var authorizeStructure: AuthorizeStructure = new AuthorizeStructure();
              var auth0User: any;
              this.auth.getIdTokenClaims().subscribe((token) => {
                authorizeStructure.accessToken = token?.__raw
                this.auth.getUser().subscribe((data) => {
                  auth0User = data
                  authorizeStructure.userId = auth0User.sub;
                  authorizeStructure.email = auth0User.email;
                  authorizeStructure.phoneNumber = auth0User.phone_number;
                  authorizeStructure.givenName = auth0User.given_name;
                  authorizeStructure.familyName = auth0User.family_name;
                  this.refreshHttpOptions().then((httpOptions:any) => {
                    this.userService.Post_AuthorizeUser(authorizeStructure, httpOptions).subscribe(userId => {
                      if (userId == 0) {
                        this.auth.logout({
                          returnTo: environment.redirectUri
                        });
                      } else {
                        resolve(httpOptions);
                      }
                    });
                  });
                });
              });
            }
          });
        }
      });
    });
  }

  refreshHttpOptions() {
    return new Promise((resolve, reject) => {
      
      this.auth.getUser().subscribe(userData => {
        if (userData?.email != null) {
          var userEmail = userData.email;
          
          this.auth.getIdTokenClaims().subscribe(tokenData => {
            
            if (tokenData?.__raw != null) {
              var token = tokenData?.__raw;
              
              let headers: HttpHeaders = new HttpHeaders()
              .set("Content-Type", "application/json")
              .set("ApiKey", environment.apiKey)
              .set("UserEmail", userEmail)
              .set("UserToken", token);
              
              resolve({headers: headers});
            }
          });
        }
      }); 
    });
  }
}
