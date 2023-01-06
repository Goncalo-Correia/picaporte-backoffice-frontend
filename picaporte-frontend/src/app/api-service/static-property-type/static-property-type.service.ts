import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Static_PropertyType } from 'src/app/models/static/static-propertytype.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticPropertyTypeService {
  
    // Base url
    baseurl = environment.apiUrl;
    constructor(private http: HttpClient) {}

  // GET ALL
  GetAll_PropertyTypes(isActive: boolean, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyType[]> {
    return this.http
      .get<Static_PropertyType[]>(this.baseurl + apiEndpoints.static_propertyType.get + isActive, httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_PropertyType(data: Static_PropertyType, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyType> {
    return this.http
      .post<Static_PropertyType>(
        this.baseurl + apiEndpoints.static_propertyType.base,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_PropertyType(data: Static_PropertyType, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyType> {
    return this.http
      .put<Static_PropertyType>(
        this.baseurl + apiEndpoints.static_propertyType.base + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  Put_PropertyTypes(data: Array<Static_PropertyType>, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyType> {
    return this.http
      .put<Static_PropertyType>(
        this.baseurl + apiEndpoints.static_propertyType.updateAll,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  Delete_PropertyType(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_propertyType.base + data,
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
