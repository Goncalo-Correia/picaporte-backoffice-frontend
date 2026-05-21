import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { Static_PropertyLocationType } from 'src/app/models/static/static-propertylocationtype.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticPropertyLocationTypeService {

  // Base url
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // GET ALL
  GetAll_PropertyLocationTypes(isActive: boolean, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyLocationType[]> {
    return this.http
      .get<Static_PropertyLocationType[]>(this.baseurl + apiEndpoints.static_propertyLocationType.get + isActive, httpOptions)
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // POST
  Post_AmenetieType(data: Static_PropertyLocationType, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyLocationType> {
    return this.http
      .post<Static_PropertyLocationType>(
        this.baseurl + apiEndpoints.static_propertyLocationType.base,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // PUT
  Put_AmenetieType(data: Static_PropertyLocationType, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyLocationType> {
    return this.http
      .put<Static_PropertyLocationType>(
        this.baseurl + apiEndpoints.static_propertyLocationType.base + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  Put_AmenetieTypes(data: Array<Static_PropertyLocationType>, httpOptions: { headers: HttpHeaders }): Observable<Static_PropertyLocationType> {
    return this.http
      .put<Static_PropertyLocationType>(
        this.baseurl + apiEndpoints.static_propertyLocationType.updateAll,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // DELETE
  Delete_AmenetieType(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_propertyLocationType.base + data,
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

