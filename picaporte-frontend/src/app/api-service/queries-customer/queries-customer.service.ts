import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CustomerDashboardStructure } from 'src/app/structures/customer-dashboard.structure';
import { apiEndpoints, environment } from 'src/environments/environment';
import { SearchAndFilterStructure } from 'src/app/structures/search-and-filter.structure';

@Injectable({
  providedIn: 'root'
})
export class QueriesCustomerService {

    // Base url
    baseurl = environment.apiUrl;
    constructor(private http: HttpClient) {}
    // Http Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    // GET
    Get_CustomerStructure(id: number): Observable<CustomerDashboardStructure> {
      return this.http
        .get<CustomerDashboardStructure>(this.baseurl + apiEndpoints.queries_customer.get + id)
        .pipe(retry(1), catchError(this.errorHandl));
    }
        
    // PUT
    Put_CustomerStructure(id: number, data: CustomerDashboardStructure): Observable<CustomerDashboardStructure> {
      return this.http
        .put<CustomerDashboardStructure>(
          this.baseurl + apiEndpoints.queries_customer.put + id,
            JSON.stringify(data),
            this.httpOptions
          )
        .pipe(retry(1), catchError(this.errorHandl));
    }

    // POST
    Post_CustomerStructure(data: CustomerDashboardStructure): Observable<CustomerDashboardStructure> {
      return this.http
        .post<CustomerDashboardStructure>(
          this.baseurl + apiEndpoints.queries_customer.post,
          JSON.stringify(data),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.errorHandl));
    }

    // POST
    Post_SearchAndFilter_CustomerStructure(data: SearchAndFilterStructure): Observable<CustomerDashboardStructure[]> {
      return this.http
        .post<CustomerDashboardStructure[]>(
          this.baseurl + apiEndpoints.queries_customer.searchAndFilter,
          JSON.stringify(data),
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
