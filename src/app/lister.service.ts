import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ListerService {

  // TODO: get URL from a config file, could be based on env.
  private baseUrl = '/api/lists/';

  constructor(private http: HttpClient) { }

  getLists() {
    return this.http.get(this.baseUrl);
  }

  deleteList(_id) {
    return this.http.delete(this.baseUrl + _id, { responseType: 'text' });
  }

  addList(newList: List) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.baseUrl, newList, httpOptions);
  }

  updateList(listId: string, list: List) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.baseUrl + listId, list);
  }

  getList(listId) {
    return this.http.get(this.baseUrl + listId);
  }


}
