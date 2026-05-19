import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'picaporte-frontend';
  isLoading = true;

  constructor(public auth: AuthService, private router: Router) {}

  isAccessDeniedRoute(): boolean {
    return this.router.url === '/access-denied' || this.router.url === '/forbidden';
  }

  ngOnInit(): void {
    this.auth.isLoading$.pipe(
      filter(loading => !loading),
      take(1)
    ).subscribe(() => {
      this.isLoading = false;
    });
  }
}
