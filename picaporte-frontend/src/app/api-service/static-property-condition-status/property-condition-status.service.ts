import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
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
  GetAll_PropertyConditionStatuses(isActive: boolean, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyConditionStatus[]> {
    return this.http
      .get<Static_PropertyConditionStatus[]>(this.baseurl + apiEndpoints.static_propertyConditionStatus.get + isActive, httpOptions)
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // POST
  Post_PropertyConditionStatus(data: Static_PropertyConditionStatus, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyConditionStatus> {
    return this.http
      .post<Static_PropertyConditionStatus>(
        this.baseurl + apiEndpoints.static_propertyConditionStatus.base,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // PUT
  Put_PropertyConditionStatus(data: Static_PropertyConditionStatus, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyConditionStatus> {
    return this.http
      .put<Static_PropertyConditionStatus>(
        this.baseurl + apiEndpoints.static_propertyConditionStatus.base + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  Put_PropertyConditionStatuses(data: Array<Static_PropertyConditionStatus>, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyConditionStatus> {
    return this.http
      .put<Static_PropertyConditionStatus>(
        this.baseurl + apiEndpoints.static_propertyConditionStatus.updateAll,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // DELETE
  Delete_PropertyConditionStatus(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_propertyConditionStatus.base + data,
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
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

