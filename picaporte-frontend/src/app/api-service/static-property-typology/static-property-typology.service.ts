import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { Static_PropertyTypology } from 'src/app/models/static/static-propertytypology.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticPropertyTypologyService {

    // Base url
    baseurl = environment.apiUrl;
    constructor(private http: HttpClient) {}

  // GET ALL
  GetAll_PropertyTypology(isActive: boolean, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyTypology[]> {
    return this.http
      .get<Static_PropertyTypology[]>(this.baseurl + apiEndpoints.static_propertyTypology.get + isActive, httpOptions)
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // POST
  Post_PropertyTypologies(data: Static_PropertyTypology, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyTypology> {
    return this.http
      .post<Static_PropertyTypology>(
        this.baseurl + apiEndpoints.static_propertyTypology.base,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // PUT
  Put_PropertyTypology(data: Static_PropertyTypology, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyTypology> {
    return this.http
      .put<Static_PropertyTypology>(
        this.baseurl + apiEndpoints.static_propertyTypology.base + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  Put_PropertyTypologies(data: Array<Static_PropertyTypology>, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyTypology> {
    return this.http
      .put<Static_PropertyTypology>(
        this.baseurl + apiEndpoints.static_propertyTypology.updateAll,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }


  // DELETE
  Delete_PropertyTypology(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_propertyTypology.base + data,
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

