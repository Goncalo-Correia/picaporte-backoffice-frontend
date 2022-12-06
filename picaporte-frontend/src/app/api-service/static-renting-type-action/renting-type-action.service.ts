import { Injectable } from '@angular/core';
import { Static_RentingActionType } from 'src/app/models/static/static-rentingActionType.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticRentingTypeActionService {

    // Base url
    baseurl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    // GET ALL
    GetAll_RentingActionTypes(httpOptions: { headers: HttpHeaders }): Observable<Static_RentingActionType[]> {
      return this.http
        .get<Static_RentingActionType[]>(this.baseurl + apiEndpoints.static_rentingActionTypes, httpOptions)
        .pipe(retry(1), catchError(this.errorHandl));
    }

    // Error handling
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
