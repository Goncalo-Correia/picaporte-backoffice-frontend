import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityLogStructure } from 'src/app/structures/activity-log.structure';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

   // Base url
   baseurl = environment.apiUrl;
   constructor(private http: HttpClient) {}

   // GET ALL
   GetActivityLogs(entityReferenceId: number, httpOptions: { headers: HttpHeaders }): Observable<ActivityLogStructure[]> {
     return this.http
       .get<ActivityLogStructure[]>(this.baseurl + apiEndpoints.activityLog.get + entityReferenceId, httpOptions)
   }
}
