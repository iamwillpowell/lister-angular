import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ListerService {

  // TODO: get URL from a config file, could be based on env.
  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getLists() {
    return this.http.get(this.baseUrl + 'lists/');
  }

  deleteList(_id) {
    return this.http.delete(this.baseUrl + 'lists/' + _id, { responseType: 'text' });
  }

  addList(newList: List) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.baseUrl + 'lists/', newList, httpOptions);
  }

  getList(listId) {
    return this.http.get(this.baseUrl + 'list/' + listId);
  }
}
