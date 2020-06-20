import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZgloszenieService {
  host = 'http://localhost:8081/';

  constructor(private http: HttpClient) {
  }
  public getAllZgloszenia() {
    return this.http.get(this.host + 'api/zgloszenie');
  }
}
