import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enum_EntityType } from 'src/app/models/enum/entity-type.enum';
import { Task } from 'src/app/models/task.model';
import { TaskKpiDashboardStructure } from 'src/app/structures/task-structures/task-kpi-dashboard.structure';
import { TaskSearchAndFilterStructure } from 'src/app/structures/task-structures/task-search-and-filter.structure';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueriesTaskService {

  // Base url
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  GetTasksByRecordId(recordId: string, entityTypeId: Enum_EntityType, httpOptions: { headers: HttpHeaders }): Observable<Array<Task>> {
    return this.http
      .get<Array<Task>>(
        this.baseurl + apiEndpoints.queries_task.getByRecordId + recordId + "/" + entityTypeId,
        httpOptions
      );
  }

  GetKpis(httpOptions: { headers: HttpHeaders }): Observable<TaskKpiDashboardStructure> {
    return this.http
      .get<TaskKpiDashboardStructure>(
        this.baseurl + apiEndpoints.queries_task.kpi,
        httpOptions
      );
  }

  Allocate(taskId: string, userEmail: string | undefined, httpOptions: { headers: HttpHeaders }): Observable<Task> {
    return this.http
      .post<Task>(
        this.baseurl + apiEndpoints.queries_task.allocate + taskId + "/" + userEmail,
        {},
        httpOptions
      );
  }

  Update(data: Task, httpOptions: { headers: HttpHeaders }): Observable<Task> {
    return this.http
      .post<Task>(
        this.baseurl + apiEndpoints.queries_task.update,
        JSON.stringify(data),
        httpOptions
      );
  }

  SearchAndFilter(data: TaskSearchAndFilterStructure, httpOptions: { headers: HttpHeaders }): Observable<Array<Task>> {
    return this.http
      .post<Array<Task>>(
        this.baseurl + apiEndpoints.queries_task.searchAndFilter,
        JSON.stringify(data),
        httpOptions
      );
  }
}
