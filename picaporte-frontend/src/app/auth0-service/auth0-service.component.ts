import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth0-service',
  templateUrl: './auth0-service.component.html',
  styleUrls: ['./auth0-service.component.css']
})
export class Auth0ServiceComponent implements OnInit {

  // Inject the authentication service into your component through the constructor
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  ngOnInit(): void {
  }

}
