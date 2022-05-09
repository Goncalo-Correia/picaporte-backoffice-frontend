import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Static_AmenetieType } from 'src/app/models/static/static-amenetieType.model';
import { apiEndpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticAmenetieTypeServiceService {

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
   GetAll_AmenetieTypes(): Observable<Static_AmenetieType[]> {
     return this.http
       .get<Static_AmenetieType[]>(this.baseurl + apiEndpoints.static_amenetieType.getAll)
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
