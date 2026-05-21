import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { Static_DocumentStatus } from 'src/app/models/static/static-documentstatus.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticDocumentStatusService {

   // Base url
   baseurl = environment.apiUrl;
   constructor(private http: HttpClient) {}

  // GET ALL
  GetAll_DocumentStatus(isActive: boolean, httpOptions: { headers: HttpHeaders }): Observable<Static_DocumentStatus[]> {
    return this.http
      .get<Static_DocumentStatus[]>(this.baseurl + apiEndpoints.static_documentStatus.get + isActive, httpOptions)
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // POST
  Post_DocumentStatus(data: Static_DocumentStatus, httpOptions: { headers: HttpHeaders }): Observable<Static_DocumentStatus> {
    return this.http
      .post<Static_DocumentStatus>(
        this.baseurl + apiEndpoints.static_documentStatus.base,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // PUT
  Put_DocumentStatus(data: Static_DocumentStatus, httpOptions: { headers: HttpHeaders }): Observable<Static_DocumentStatus> {
    return this.http
      .put<Static_DocumentStatus>(
        this.baseurl + apiEndpoints.static_documentStatus.base + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  Put_DocumentStatuses(data: Array<Static_DocumentStatus>, httpOptions: { headers: HttpHeaders }): Observable<Static_DocumentStatus> {
    return this.http
      .put<Static_DocumentStatus>(
        this.baseurl + apiEndpoints.static_documentStatus.updateAll,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
  }

  // DELETE
  Delete_DocumentStatus(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_documentStatus.base + data,
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

