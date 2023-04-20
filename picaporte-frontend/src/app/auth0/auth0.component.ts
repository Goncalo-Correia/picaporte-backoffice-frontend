import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth0',
  templateUrl: './auth0.component.html',
  styleUrls: ['./auth0.component.css']
})
export class Auth0Component {

  @Input() isOpen: boolean = true;
  
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }

}
