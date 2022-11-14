import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

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
  Get_News(): Observable<News[]> {
    return this.http
      .get<News[]>(this.baseurl + apiEndpoints.news.get)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_News(data: News): Observable<News> {
    return this.http
      .post<News>(
        this.baseurl + apiEndpoints.news.post,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Put_News(id: number, data: News): Observable<News> {
    return this.http
      .put<News>(
        this.baseurl + apiEndpoints.news.put + id,
          JSON.stringify(data),
          this.httpOptions
        )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Delete_News(id: number): Observable<News> {
    return this.http
      .delete<News>(
        this.baseurl + apiEndpoints.news.delete + id,
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
    return throwError(() => {
      return errorMessage;
    });
  }
}
