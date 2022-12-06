import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Static_PropertyConditionStatus } from 'src/app/models/static/static-propertyconditionstatus.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticPropertyConditionStatusService {

    // Base url
    baseurl = environment.apiUrl;
    constructor(private http: HttpClient) {}

  // GET ALL
  GetAll_PropertyConditionStatuses(httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyConditionStatus[]> {
    return this.http
      .get<Static_PropertyConditionStatus[]>(this.baseurl + apiEndpoints.static_propertyConditionStatus, httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_PropertyConditionStatus(data: Static_PropertyConditionStatus, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyConditionStatus> {
    return this.http
      .post<Static_PropertyConditionStatus>(
        this.baseurl + apiEndpoints.static_propertyConditionStatus,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_PropertyConditionStatus(data: Static_PropertyConditionStatus, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyConditionStatus> {
    return this.http
      .put<Static_PropertyConditionStatus>(
        this.baseurl + apiEndpoints.static_propertyConditionStatus + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  Delete_PropertyConditionStatus(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_propertyConditionStatus + data,
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
