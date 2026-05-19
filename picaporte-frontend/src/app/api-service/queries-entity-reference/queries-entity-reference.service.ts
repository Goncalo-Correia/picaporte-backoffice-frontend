import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Enum_EntityType } from 'src/app/models/enum/entity-type.enum';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';
import { EntityReferenceDashboardStructure } from 'src/app/structures/dashboard-structures/entity-reference/entity-reference-dashboard.structure';
import { EntityReferenceSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/entity-reference/entity-reference-search-and-filter.structure';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueriesEntityReferenceService {

    // Base url
    baseurl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    // POST
    Post_SearchAndFilter_EntityReferenceStructure(data: EntityReferenceSearchAndFilterStructure, httpOptions: { headers: HttpHeaders }): Observable<EntityReferenceDashboardStructure[]> {
    return this.http
        .post<EntityReferenceDashboardStructure[]>(
          this.baseurl + apiEndpoints.queries_entityReference.searchAndFilter,
          JSON.stringify(data),
          httpOptions
        )
        .pipe(retry(1), catchError(this.errorHandl));
    }

    Get_Kpis(httpOptions: { headers: HttpHeaders }) {
      return this.http
        .get<DashboardKpiStructure[]>(this.baseurl + apiEndpoints.queries_entityReference.kpi, httpOptions)
        .pipe(retry(1), catchError(this.errorHandl));
    }

    Delete_EntityReference(id: string, entityTypeId: Enum_EntityType, httpOptions: { headers: HttpHeaders }) {
      return this.http
      .post(this.baseurl + apiEndpoints.queries_entityReference.delete + id + "/" + <number>entityTypeId, httpOptions)
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
