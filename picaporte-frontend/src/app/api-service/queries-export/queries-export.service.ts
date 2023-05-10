import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/customer/customer-dashboard-search-and-filter.structure';
import { PropertyDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/property/property-dashboard-search-and-filter.structure';
import { UserDashboardSearchAndFilterStructure } from 'src/app/structures/dashboard-structures/user/user-dashboard-search-and-filter.structure';
import { ExportStructure } from 'src/app/structures/export-structure';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueriesExportService {

  // Base url
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  ExportUsers(data: UserDashboardSearchAndFilterStructure, httpOptions: { headers: HttpHeaders }): Observable<ExportStructure> {
    return this.http
      .post<ExportStructure>(
        this.baseurl + apiEndpoints.queries_export.exportUser,
        JSON.stringify(data),
        httpOptions
      );
  }

  ExportCustomer(data: CustomerDashboardSearchAndFilterStructure, httpOptions: { headers: HttpHeaders }): Observable<ExportStructure> {
    return this.http
      .post<ExportStructure>(
        this.baseurl + apiEndpoints.queries_export.exportCustomer,
        JSON.stringify(data),
        httpOptions
      );
  }

  ExportProperty(data: PropertyDashboardSearchAndFilterStructure, httpOptions: { headers: HttpHeaders }): Observable<ExportStructure> {
    return this.http
      .post<ExportStructure>(
        this.baseurl + apiEndpoints.queries_export.exportProperty,
        JSON.stringify(data),
        httpOptions
      );
  }
}
