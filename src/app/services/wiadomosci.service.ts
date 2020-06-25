import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WiadomosciService {
  host = 'http://localhost:8081/';
  constructor(private http: HttpClient) { }

  public getZwiazkiWiadomosci(idZwiazku){
    return this.http.get(this.host + 'api/wiadomosci/zwiazek/' + idZwiazku);
  }

  public addWiadomosci(body) {
    return this.http.post(this.host + 'api/wiadomosci', body);
  }
}
