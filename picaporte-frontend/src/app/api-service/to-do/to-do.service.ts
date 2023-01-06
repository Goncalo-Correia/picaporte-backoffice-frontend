import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ToDoStructure } from 'src/app/structures/to-do.structure';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  // Base url
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // GET ALL
  Get_ToDos(httpOptions: { headers: HttpHeaders }): Observable<ToDoStructure[]> {
    return this.http
      .get<ToDoStructure[]>(this.baseurl + apiEndpoints.toDos.get, httpOptions)
  }

  // POST
  Post_ToDos(data: ToDoStructure, httpOptions: { headers: HttpHeaders }): Observable<ToDoStructure> {
    return this.http
      .post<ToDoStructure>(
        this.baseurl + apiEndpoints.toDos.post,
        JSON.stringify(data),
        httpOptions
      )
  }

  // DELETE
  Delete_ToDo(id: number, httpOptions: { headers: HttpHeaders }): Observable<ToDoStructure> {
    return this.http
      .delete<ToDoStructure>(
        this.baseurl + apiEndpoints.toDos.delete + id,
        httpOptions
      )
  }
}
