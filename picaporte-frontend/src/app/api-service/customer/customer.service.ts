import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { apiEndpoints, environment } from 'src/environments/environment';

interface PagedResponse<T> {
  items?: T[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

   // Base url
   baseurl = environment.apiUrl;
   constructor(private http: HttpClient) {}

   // GET ALL
   GetAll_Customers(httpOptions: { headers: HttpHeaders }): Observable<Customer[]> {
     return this.http
       .get<Customer[] | PagedResponse<Customer>>(this.baseurl + apiEndpoints.customer.getAll, httpOptions)
       .pipe(
        retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }),
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }

          if (Array.isArray(response?.items)) {
            return response.items;
          }

          return [];
        }),
        catchError(this.errorHandl)
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
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
