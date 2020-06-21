import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZwiazekService {

  host = 'http://localhost:8081/';

  constructor(private http: HttpClient) {
  }
  public addZwiazek(body): Observable<any> {
    return this.http.post(this.host + 'api/zwiazek', body);
  }
}
