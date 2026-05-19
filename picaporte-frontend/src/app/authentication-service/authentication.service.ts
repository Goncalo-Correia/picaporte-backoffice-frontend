import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  refreshHttpOptions(): Promise<{ headers: HttpHeaders }> {
    return Promise.resolve({
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
