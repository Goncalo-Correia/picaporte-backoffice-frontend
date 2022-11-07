import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { EntityReferenceDashboardStructure } from 'src/app/structures/dashboard-structures/entity-reference/entity-reference-dashboard.structure';
import { EntityReferenceSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/entity-reference/entity-reference-search-and-filter.structure';
import { SearchAndFilterStructure } from 'src/app/structures/dashboard-structures/search-and-filter.structure';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueriesEntityReferenceService {

    // Base url
    baseurl = environment.apiUrl;
    constructor(private http: HttpClient) {}
    // Http Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    // POST
    Post_SearchAndFilter_EntityReferenceStructure(data: EntityReferenceSearchAndFilterStructure): Observable<EntityReferenceDashboardStructure[]> {
    return this.http
        .post<EntityReferenceDashboardStructure[]>(
          this.baseurl + apiEndpoints.queries_entityReference.searchAndFilter,
          JSON.stringify(data),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.errorHandl));
    }

    Get_Kpis() {
      return this.http
        .get<DashboardKpiStructure[]>(this.baseurl + apiEndpoints.queries_entityReference.kpi)
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
