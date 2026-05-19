import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent {
  user$ = this.auth.user$;

  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout({ returnTo: window.location.origin + '/login' });
  }
}
