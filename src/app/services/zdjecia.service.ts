import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZdjeciaService {

  host = 'http://localhost:8081/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  public getAllImages() {
    return this.http.get(this.host + 'api/zdjecia');
  }

  public getAllImagesByUser(id) {
    return this.http.get(this.host + 'api/zdjecia/uzytkownik/' + id);
  }

  public getProfileImageByUser(id) {
    return this.http.get(this.host + 'api/zdjecia/profil/uzytkownik/' + id);
  }
  public getAllProfileImage() {
    return this.http.get(this.host + 'api/zdjecia/profil');
  }

  public deleteImage(body) {
    return this.http.request('delete', this.host + 'api/zdjecia', {body});
  }

  public deleteProfileImage(id) {
    return this.http.request('delete', this.host + 'api/zdjecia/uzytkownik/' + id);
  }

  public addImage(body) {
    return this.http.post(this.host + 'api/zdjecia', body);
  }

  public addImageFile(idZdjecia, body) {
    return this.http.post(this.host + 'api/zdjecia/' + idZdjecia, body);
  }

  public updateImage(body) {
    return this.http.put(this.host + 'api/zdjecia', body);
  }
}
