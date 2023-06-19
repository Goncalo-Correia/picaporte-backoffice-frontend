import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Renting } from 'src/app/models/renting.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentingService {

  // Base url
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // GET ALL
  GetRentingsByPropertyId(propertyId: number, httpOptions: { headers: HttpHeaders }): Observable<Renting[]> {
    return this.http
      .get<Renting[]>(this.baseurl + apiEndpoints.renting.getRentingsByPropertyId + propertyId, httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_Renting(data: Renting, httpOptions: { headers: HttpHeaders }): Observable<Renting> {
    return this.http
      .post<Renting>(
        this.baseurl + apiEndpoints.renting.post,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_Renting(id: number, data: Renting, httpOptions: { headers: HttpHeaders }): Observable<Renting> {
    return this.http
      .put<Renting>(
        this.baseurl + apiEndpoints.renting.put + id,
          JSON.stringify(data),
          httpOptions
        );
  }

  // PUT
  Delete_Renting(id: number, httpOptions: { headers: HttpHeaders }): Observable<Renting> {
    return this.http
      .delete<Renting>(
        this.baseurl + apiEndpoints.renting.delete + id,
        httpOptions
      );
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
    return throwError(() => {
      return errorMessage;
    });
  }
}
