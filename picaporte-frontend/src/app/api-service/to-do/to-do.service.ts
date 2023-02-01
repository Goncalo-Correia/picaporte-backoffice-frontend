import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ToDoItem } from 'src/app/models/to-do-item.model';
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

    // POST
    Post_ToDoItem(data: ToDoItem, httpOptions: { headers: HttpHeaders }): Observable<ToDoItem> {
      return this.http
        .post<ToDoItem>(
          this.baseurl + apiEndpoints.toDos.postItem,
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

    // DELETE
    Delete_ToDoItem(id: number, httpOptions: { headers: HttpHeaders }) {
      return this.http
        .delete(
          this.baseurl + apiEndpoints.toDos.deleteItem + id,
          httpOptions
        )
    }
}
