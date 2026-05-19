import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { PropertyDashboardStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard.structure';
import { PropertyStructure } from 'src/app/structures/main-structures/property.structure';
import { apiEndpoints, environment } from 'src/environments/environment';
import { PropertyDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard-search-and-filter.structure';
import { DashboardKpiStructure } from 'src/app/structures/dashboard-structures/dashboard-kpi.structure';

@Injectable({
  providedIn: 'root'
})
export class QueriesPropertyService {

  // Base url
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // GET
  Get_PropertyStructure(id: string, httpOptions: { headers: HttpHeaders }): Observable<PropertyStructure> {
    return this.http
      .get<PropertyStructure>(this.baseurl + apiEndpoints.queries_property.get + id);
  }

  // PUT
  Put_PropertyStructure(id: string, data: PropertyStructure, httpOptions: { headers: HttpHeaders }): Observable<PropertyStructure> {
    return this.http
      .put<PropertyStructure>(
        this.baseurl + apiEndpoints.queries_property.put + id,
        JSON.stringify(data),
        httpOptions
      );
  }

  // POST
  Post_PropertyStructure(data: PropertyStructure, httpOptions: { headers: HttpHeaders }): Observable<PropertyStructure> {
    return this.http
      .post<PropertyStructure>(
        this.baseurl + apiEndpoints.queries_property.post,
        JSON.stringify(data),
        httpOptions
      );
  }

  // POST
  Post_SearchAndFilter_PropertyStructure(data: PropertyDashboardSearchAndFilterStructure, httpOptions: { headers: HttpHeaders }): Observable<PropertyDashboardStructure[]> {
    return this.http
      .post<PropertyDashboardStructure[]>(
        this.baseurl + apiEndpoints.queries_property.searchAndFilter,
        JSON.stringify(data),
        httpOptions
      );
  }

  Get_Kpis(httpOptions: { headers: HttpHeaders }) {
    return this.http
      .get<DashboardKpiStructure[]>(this.baseurl + apiEndpoints.queries_property.kpi, httpOptions);
  }

  Post_RequestDocument(documentTypeId: number, propertyId: string, httpOptions: { headers: HttpHeaders }) {
    return this.http
      .post(
        this.baseurl + apiEndpoints.document.requestDocument + documentTypeId + "/" + propertyId,
        {},
        httpOptions
      );
  }

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
