import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { ActivityLogStructure } from 'src/app/structures/activity-log.structure';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

   // Base url
   baseurl = environment.apiUrl;
   constructor(private http: HttpClient) {}
   // Http Headers
   httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     }),
   };

   // GET ALL
   GetActivityLogs(entityReferenceId?: number): Observable<ActivityLogStructure[]> {
     return this.http
       .get<ActivityLogStructure[]>(this.baseurl + apiEndpoints.activityLog.get + entityReferenceId)
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
