import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { PropertyDashboardStructure } from 'src/app/structures/dashboard-structures/property-dashboard.structure';
import { PropertyStructure } from 'src/app/structures/main-structures/property.structure';
import { SearchAndFilterStructure } from 'src/app/structures/dashboard-structures/search-and-filter.structure';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueriesPropertyService {

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
    Get_PropertyStructure(id: number): Observable<PropertyStructure> {
      return this.http
        .get<PropertyStructure>(this.baseurl + apiEndpoints.queries_property.get + id)
        .pipe(retry(1), catchError(this.errorHandl));
    }
        
    // PUT
    Put_PropertyStructure(id: number, data: PropertyStructure): Observable<PropertyStructure> {
      return this.http
        .put<PropertyStructure>(
          this.baseurl + apiEndpoints.queries_property.put + id,
            JSON.stringify(data),
            this.httpOptions
          )
        .pipe(retry(1), catchError(this.errorHandl));
    }

    // POST
    Post_PropertyStructure(data: PropertyStructure): Observable<PropertyStructure> {
      return this.http
        .post<PropertyStructure>(
          this.baseurl + apiEndpoints.queries_property.post,
          JSON.stringify(data),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.errorHandl));
    }

    // POST
    Post_SearchAndFilter_PropertyStructure(data: SearchAndFilterStructure): Observable<PropertyDashboardStructure[]> {
      return this.http
        .post<PropertyDashboardStructure[]>(
          this.baseurl + apiEndpoints.queries_property.searchAndFilter,
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
