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
   // Http Headers
   httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     }),
   };

  // GET ALL
  GetAll_DocumentTypes(): Observable<Static_DocumentType[]> {
    return this.http
      .get<Static_DocumentType[]>(this.baseurl + apiEndpoints.static_documentTypes)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_DocumentType(data: Static_DocumentType): Observable<Static_DocumentType> {
    return this.http
      .post<Static_DocumentType>(
        this.baseurl + apiEndpoints.static_documentTypes,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_DocumentType(data: Static_DocumentType): Observable<Static_DocumentType> {
    return this.http
      .put<Static_DocumentType>(
        this.baseurl + apiEndpoints.static_documentTypes + data.id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  Delete_DocumentType(data: number) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_documentTypes + data,
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
