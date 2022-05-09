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
    // Http Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    // GET ALL
    GetAll_PropertyTypes(): Observable<Static_PropertyType[]> {
      return this.http
        .get<Static_PropertyType[]>(this.baseurl + apiEndpoints.static_propertyType.getAll)
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
