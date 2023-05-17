import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Base url
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // GET ALL
  Send_Newsletter(httpOptions: { headers: HttpHeaders }) {
    return this.http
      .post(this.baseurl + apiEndpoints.notification.newsletter, {}, httpOptions)
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
      return throwError(() => {
        return errorMessage;
      });
    }
}