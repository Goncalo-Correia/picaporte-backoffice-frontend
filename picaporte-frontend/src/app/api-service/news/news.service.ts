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

  // GET ALL
  Get_News(httpOptions: { headers: HttpHeaders }): Observable<News[]> {
    return this.http
      .get<News[]>(this.baseurl + apiEndpoints.news.get, httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_News(data: News, httpOptions: { headers: HttpHeaders }): Observable<News> {
    return this.http
      .post<News>(
        this.baseurl + apiEndpoints.news.post,
        JSON.stringify(data),
        httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  Approve_News(data: News, httpOptions: { headers: HttpHeaders }): Observable<News> {
    return this.http
      .post<News>(
        this.baseurl + apiEndpoints.news.approve + data.id,
        JSON.stringify(data),
        httpOptions
      );
  }


  // PUT
  Put_News(id: number, data: News, httpOptions: { headers: HttpHeaders }): Observable<News> {
    return this.http
      .put<News>(
        this.baseurl + apiEndpoints.news.put + id,
          JSON.stringify(data),
          httpOptions
        )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  Delete_News(id: number, httpOptions: { headers: HttpHeaders }): Observable<News> {
    return this.http
      .delete<News>(
        this.baseurl + apiEndpoints.news.delete + id,
        httpOptions
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
