import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Static_DocumentStatus } from 'src/app/models/static/static-documentstatus.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticDocumentStatusService {

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
  GetAll_DocumentStatus(): Observable<Static_DocumentStatus[]> {
    return this.http
      .get<Static_DocumentStatus[]>(this.baseurl + apiEndpoints.static_documentStatus)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_DocumentStatus(data: Static_DocumentStatus): Observable<Static_DocumentStatus> {
    return this.http
      .post<Static_DocumentStatus>(
        this.baseurl + apiEndpoints.static_documentStatus,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_DocumentStatus(data: Static_DocumentStatus): Observable<Static_DocumentStatus> {
    return this.http
      .put<Static_DocumentStatus>(
        this.baseurl + apiEndpoints.static_documentStatus + data.id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  Delete_DocumentStatus(data: number) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_documentStatus + data,
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
