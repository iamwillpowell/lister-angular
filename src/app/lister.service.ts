import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { List } from './list';

@Injectable({
  providedIn: 'root'
})
export class ListerService {
  // TODO: get URL from a config file, could be based on env.
  private baseUrl = '/api/';

  constructor(private http: HttpClient) {}

  getLists() {
    return this.http
      .get(this.baseUrl + 'lists/')
      .pipe(catchError(this.handleError));
  }

  deleteList(_id) {
    return this.http
      .delete(this.baseUrl + 'lists/' + _id, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  addList(newList: List) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post(this.baseUrl + 'lists/', newList, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateList(listId: string, list: List) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http
      .put(this.baseUrl + 'lists/' + listId, list)
      .pipe(catchError(this.handleError));
  }

  getList(listId) {
    return this.http
      .get(this.baseUrl + 'lists/' + listId)
      .pipe(catchError(this.handleError));
  }

  // straight from Angular http docs, for now.
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
