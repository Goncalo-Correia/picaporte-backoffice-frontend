import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Static_DocumentType } from 'src/app/models/static/static-documenttype.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticDocumentTypeService {

   // Base url
   baseurl = environment.apiUrl;
   constructor(private http: HttpClient) {}

  // GET ALL
  GetAll_DocumentTypes(httpOptions: { headers: HttpHeaders }): Observable<Static_DocumentType[]> {
    return this.http
      .get<Static_DocumentType[]>(this.baseurl + apiEndpoints.static_documentTypes, httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_DocumentType(data: Static_DocumentType, httpOptions: { headers: HttpHeaders }): Observable<Static_DocumentType> {
    return this.http
      .post<Static_DocumentType>(
        this.baseurl + apiEndpoints.static_documentTypes,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_DocumentType(data: Static_DocumentType, httpOptions: { headers: HttpHeaders }): Observable<Static_DocumentType> {
    return this.http
      .put<Static_DocumentType>(
        this.baseurl + apiEndpoints.static_documentTypes + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  Delete_DocumentType(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_documentTypes + data,
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
