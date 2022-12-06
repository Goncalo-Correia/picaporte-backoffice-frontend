import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Static_PropertyStatus } from 'src/app/models/static/static-propertystatus.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticPropertyStatusService {

    // Base url
    baseurl = environment.apiUrl;
    constructor(private http: HttpClient) {}

  // GET ALL
  GetAll_PropertyStatuses(httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyStatus[]> {
    return this.http
      .get<Static_PropertyStatus[]>(this.baseurl + apiEndpoints.static_propertyStatus, httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_PropertyStatus(data: Static_PropertyStatus, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyStatus> {
    return this.http
      .post<Static_PropertyStatus>(
        this.baseurl + apiEndpoints.static_propertyStatus,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_PropertyStatus(data: Static_PropertyStatus, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyStatus> {
    return this.http
      .put<Static_PropertyStatus>(
        this.baseurl + apiEndpoints.static_propertyStatus + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  Delete_PropertyStatus(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_propertyStatus + data,
        httpOptions
      )
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
