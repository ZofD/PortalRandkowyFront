import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PodkategorieService {

  host = 'http://localhost:8081/';

  constructor(private http: HttpClient) {
  }

  public getAllPodkategorie() {
    return this.http.get(this.host + 'api/podkategorie');
  }
}
