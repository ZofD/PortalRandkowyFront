import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZwiazekService {

  host = 'http://localhost:8081/';

  constructor(private http: HttpClient) {
  }

  public getAllZwiazki() {
    return this.http.get(this.host + 'api/zwiazek');
  }

  public getZwiazkiUzytkownik(idUser){
    return this.http.get(this.host + 'api/zwiazek/uzytkownik/' + idUser);
  }

  public addZwiazek(body): Observable<any> {
    return this.http.post(this.host + 'api/zwiazek', body);
  }

  public banZwiazek(body): Observable<any> {
    return this.http.put(this.host + 'api/zwiazek', body);
  }

  public czyZwiazek(uzytkownikA, uzytkownikB) {
    return this.http.get(this.host + 'api/zwiazek/uzytkownikA/' + uzytkownikA + '/uzytkownikB/' + uzytkownikB);
  }
}
