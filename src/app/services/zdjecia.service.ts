import { Injectable } from '@angular/core';
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

  public deleteImage(body) {
    return this.http.request('delete', this.host + 'api/zdjecia', {body});
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
