import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticAmenetieTypeService {

  // Base url
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // GET ALL
  GetAll_AmenetieTypes(httpOptions: { headers: HttpHeaders }): Observable<Static_AmenetieType[]> {
    return this.http
      .get<Static_AmenetieType[]>(this.baseurl + apiEndpoints.static_amenetieType, httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_AmenetieType(data: Static_AmenetieType, httpOptions: { headers: HttpHeaders }): Observable<Static_AmenetieType> {
    return this.http
      .post<Static_AmenetieType>(
        this.baseurl + apiEndpoints.static_amenetieType,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_AmenetieType(data: Static_AmenetieType, httpOptions: { headers: HttpHeaders }): Observable<Static_AmenetieType> {
    return this.http
      .put<Static_AmenetieType>(
        this.baseurl + apiEndpoints.static_amenetieType + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  Delete_AmenetieType(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_amenetieType + data,
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
