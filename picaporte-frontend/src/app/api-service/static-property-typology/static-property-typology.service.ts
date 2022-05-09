import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Static_PropertyTypology } from 'src/app/models/static/static-propertytypology.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticPropertyTypologyService {

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
    GetAll_PropertyTypologies(): Observable<Static_PropertyTypology[]> {
      return this.http
        .get<Static_PropertyTypology[]>(this.baseurl + apiEndpoints.static_propertyTypology.getAll)
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
