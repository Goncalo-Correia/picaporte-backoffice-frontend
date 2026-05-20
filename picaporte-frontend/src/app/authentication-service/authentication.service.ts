import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Legacy helper used across services for shared headers.
  // Bearer tokens are attached by Auth0's HTTP interceptor for allowed API URLs.
  refreshHttpOptions(): Promise<{ headers: HttpHeaders }> {
    return Promise.resolve({
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
