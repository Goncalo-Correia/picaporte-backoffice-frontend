import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
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
  GetAll_PropertyStatuses(isActive: boolean, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyStatus[]> {
    return this.http
      .get<Static_PropertyStatus[]>(this.baseurl + apiEndpoints.static_propertyStatus.get + isActive, httpOptions)
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // POST
  Post_PropertyStatus(data: Static_PropertyStatus, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyStatus> {
    return this.http
      .post<Static_PropertyStatus>(
        this.baseurl + apiEndpoints.static_propertyStatus.base,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // PUT
  Put_PropertyStatus(data: Static_PropertyStatus, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyStatus> {
    return this.http
      .put<Static_PropertyStatus>(
        this.baseurl + apiEndpoints.static_propertyStatus.base + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  Put_PropertyStatuses(data: Array<Static_PropertyStatus>, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyStatus> {
    return this.http
      .put<Static_PropertyStatus>(
        this.baseurl + apiEndpoints.static_propertyStatus.updateAll,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // DELETE
  Delete_PropertyStatus(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_propertyStatus.base + data,
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

