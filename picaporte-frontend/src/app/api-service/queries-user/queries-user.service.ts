import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { apiEndpoints, environment } from 'src/environments/environment';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { UserStructure } from 'src/app/structures/main-structures/user.structure';
import { CustomerDashboardStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard.structure';
import { UserDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/user/user-dashboard-search-and-filter.structure';
import { UserDashboardStructure } from 'src/app/structures/dashboard-structures/user/user-dashboard.structure';

@Injectable({
  providedIn: 'root'
})
export class QueriesUserService {

    // Base url
    baseurl = environment.apiUrl;
    constructor(private http: HttpClient) {}
    
    // GET
    Get_UserStructure(id: string, httpOptions: { headers: HttpHeaders }): Observable<UserStructure> {
      return this.http
        .get<UserStructure>(this.baseurl + apiEndpoints.queries_user.get + id, httpOptions)
        .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
    }

    // PUT
    Put_UserStructure(id: string, data: UserStructure, httpOptions: { headers: HttpHeaders }): Observable<UserStructure> {
      return this.http
        .put<UserStructure>(
          this.baseurl + apiEndpoints.queries_user.put + id,
            JSON.stringify(data),
            httpOptions
          )
        .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
    }
    
    // POST
    Post_UserStructure(data: UserStructure, httpOptions: { headers: HttpHeaders }): Observable<UserStructure> {
      return this.http
        .post<UserStructure>(
          this.baseurl + apiEndpoints.queries_user.post,
          JSON.stringify(data),
          httpOptions
        )
        .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
    }

    // POST
    Post_SearchAndFilter_UserStructure(data: UserDashboardSearchAndFilterStructure, httpOptions: { headers: HttpHeaders }): Observable<UserDashboardStructure[]> {
      return this.http
        .post<UserDashboardStructure[]>(
          this.baseurl + apiEndpoints.queries_user.searchAndFilter,
          JSON.stringify(data),
          httpOptions
        )
        .pipe(retry({ count: 1, delay: (err: any) => err.status === 0 ? of(true) : throwError(() => err) }), catchError(this.errorHandl));
    }

    Get_Kpis(httpOptions: { headers: HttpHeaders }) {
      return this.http
        .get<DashboardKpiStructure[]>(this.baseurl + apiEndpoints.queries_user.kpi, httpOptions)
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
