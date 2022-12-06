import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Static_EnergyCertificate } from 'src/app/models/static/static-energycertificate.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticEnergyCertificateService {

   // Base url
   baseurl = environment.apiUrl;
   constructor(private http: HttpClient) {}

  // GET ALL
  GetAll_EnergyCertificates(httpOptions: { headers: HttpHeaders }): Observable<Static_EnergyCertificate[]> {
    return this.http
      .get<Static_EnergyCertificate[]>(this.baseurl + apiEndpoints.static_energyCertificates, httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_EnergyCertificate(data: Static_EnergyCertificate, httpOptions: { headers: HttpHeaders }): Observable<Static_EnergyCertificate> {
    return this.http
      .post<Static_EnergyCertificate>(
        this.baseurl + apiEndpoints.static_energyCertificates,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_EnergyCertificate(data: Static_EnergyCertificate, httpOptions: { headers: HttpHeaders }): Observable<Static_EnergyCertificate> {
    return this.http
      .put<Static_EnergyCertificate>(
        this.baseurl + apiEndpoints.static_energyCertificates + data.id,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  Delete_EnergyCertificate(data: number, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .delete(
        this.baseurl + apiEndpoints.static_energyCertificates + data,
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
