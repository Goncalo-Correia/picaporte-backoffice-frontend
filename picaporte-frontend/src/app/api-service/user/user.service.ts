import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeStructure } from 'src/app/structures/auth0/authorize.struture';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // POST
  Post_AuthorizeUser(data: AuthorizeStructure, httpOptions: { headers: HttpHeaders }): Observable<number> {
    return this.http
      .post<number>(
        this.baseurl + apiEndpoints.user.authotize,
        JSON.stringify(data),
        httpOptions
      )
  }
}
