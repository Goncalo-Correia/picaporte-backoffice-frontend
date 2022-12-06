import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CustomerDashboardStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard.structure';
import { apiEndpoints, environment } from 'src/environments/environment';
import { SearchAndFilterStructure } from 'src/app/structures/dashboard-structures/search-and-filter.structure';
import { CustomerStructure } from 'src/app/structures/main-structures/customer.structure';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';

@Injectable({
  providedIn: 'root'
})
export class QueriesCustomerService {

    // Base url
    baseurl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    // GET
    Get_CustomerStructure(id: number, httpOptions: { headers: HttpHeaders }): Observable<CustomerStructure> {
      return this.http
        .get<CustomerStructure>(this.baseurl + apiEndpoints.queries_customer.get + id, httpOptions)
        .pipe(retry(1), catchError(this.errorHandl));
    }
        
    // PUT
    Put_CustomerStructure(id: number, data: CustomerStructure, httpOptions: { headers: HttpHeaders }): Observable<CustomerStructure> {
      return this.http
        .put<CustomerStructure>(
          this.baseurl + apiEndpoints.queries_customer.put + id,
            JSON.stringify(data),
            httpOptions
          )
        .pipe(retry(1), catchError(this.errorHandl));
    }

    // POST
    Post_CustomerStructure(data: CustomerStructure, httpOptions: { headers: HttpHeaders }): Observable<CustomerStructure> {
      return this.http
        .post<CustomerStructure>(
          this.baseurl + apiEndpoints.queries_customer.post,
          JSON.stringify(data),
          httpOptions
        )
        .pipe(retry(1), catchError(this.errorHandl));
    }

    // POST
    Post_SearchAndFilter_CustomerStructure(data: SearchAndFilterStructure, httpOptions: { headers: HttpHeaders }): Observable<CustomerDashboardStructure[]> {
      return this.http
        .post<CustomerDashboardStructure[]>(
          this.baseurl + apiEndpoints.queries_customer.searchAndFilter,
          JSON.stringify(data),
          httpOptions
        )
        .pipe(retry(1), catchError(this.errorHandl));
    }

    Get_Kpis(httpOptions: { headers: HttpHeaders }) {
      return this.http
        .get<DashboardKpiStructure[]>(this.baseurl + apiEndpoints.queries_customer.kpi, httpOptions)
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
