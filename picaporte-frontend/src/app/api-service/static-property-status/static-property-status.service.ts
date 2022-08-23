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
    // Http Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

  // GET ALL
  GetAll_PropertyStatuses(): Observable<Static_PropertyStatus[]> {
    return this.http
      .get<Static_PropertyStatus[]>(this.baseurl + apiEndpoints.static_propertyStatus)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_PropertyStatus(data: Static_PropertyStatus): Observable<Static_PropertyStatus> {
    return this.http
      .post<Static_PropertyStatus>(
        this.baseurl + apiEndpoints.static_propertyStatus,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_PropertyStatus(data: Static_PropertyStatus): Observable<Static_PropertyStatus> {
    return this.http
      .put<Static_PropertyStatus>(
        this.baseurl + apiEndpoints.static_propertyStatus + data.id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  Delete_PropertyStatus(data: number) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_propertyStatus + data,
        this.httpOptions
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
