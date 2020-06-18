import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Login} from '../log-in/log-in.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public newUser = {mail: '', plec: ''};
  public zalogowanyUzytkownik: boolean = JSON.parse(localStorage.getItem('zalogowany'));
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(this.zalogowanyUzytkownik !== null ? this.zalogowanyUzytkownik : false);

  host = 'http://localhost:8081/';

  constructor(private http: HttpClient) {
  }

  public getAllUser() {
    return this.http.get(this.host + 'api/uzytkownik');
  }

  public deleteUser(body) {
    return this.http.request('delete', this.host + 'api/uzytkownik', {body});
  }

  public addUser(body): Observable<any> {
    return this.http.post(this.host + 'api/uzytkownik', body);
  }

  public updateUser(body) {
    return this.http.put(this.host + 'api/uzytkownik', body);
  }

  public existUser(data: Login) {
    return this.http.get(this.host + 'api/uzytkownik/nick/' + data.haslo + '/password/' + data.mail);
  }
  public getSuggestions(id) {
    return this.http.get(this.host + 'api/uzytkownik/uzytkownik/' + id);
  }
}
