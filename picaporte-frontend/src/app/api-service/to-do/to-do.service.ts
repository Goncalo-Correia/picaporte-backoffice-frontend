import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ToDoStructure } from 'src/app/structures/to-do.structure';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

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
  Get_ToDos(): Observable<ToDoStructure[]> {
    return this.http
      .get<ToDoStructure[]>(this.baseurl + apiEndpoints.toDos.get)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // POST
  Post_ToDos(data: ToDoStructure): Observable<ToDoStructure> {
    return this.http
      .post<ToDoStructure>(
        this.baseurl + apiEndpoints.news.post,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // DELETE
  Delete_ToDo(id: number): Observable<ToDoStructure> {
    return this.http
      .delete<ToDoStructure>(
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
