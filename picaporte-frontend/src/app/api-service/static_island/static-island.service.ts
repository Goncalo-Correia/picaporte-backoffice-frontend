import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { Static_Island } from 'src/app/models/static/static-island.model';
import { apiEndpoints, environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StaticIslandService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAll_Islands(httpOptions: { headers: HttpHeaders }): Observable<Static_Island[]> {
    return this.http
      .get<Static_Island[]>(this.baseurl + apiEndpoints.static_island.get, httpOptions)
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
