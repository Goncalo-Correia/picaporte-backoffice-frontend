import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.pipe(
      filter(isAuthenticated => isAuthenticated),
      take(1)
    ).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  login(): void {
    this.auth.loginWithRedirect({
      appState: { target: '/' }
    });
  }
}
