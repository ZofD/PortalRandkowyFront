import { Component, OnInit } from '@angular/core';
import {ZdjeciaService} from '../services/zdjecia.service';
import {Zdjecia} from '../interface/zdjecia';
import {User} from '../user/user';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  selectedFile: File;
  user = {id: 1};//do usunięcia
  currentUser: User;
  zdjecie: Zdjecia;
  newZdjecia = {tytul: '', link: '', status: 0, opis: '', dataDodania: null, uzytkownik: this.user};
  constructor(private zdjeciaService: ZdjeciaService){}

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    // ładowanie danych o zdjęciu na sztywno
    this.newZdjecia.dataDodania = new Date();
    this.newZdjecia.tytul = 'Test';
    this.newZdjecia.opis = 'Testowy opis';
    this.newZdjecia.uzytkownik = this.user;
    console.log(this.newZdjecia);
    //
    this.zdjeciaService.addImage(this.newZdjecia).subscribe((success: Zdjecia) => {
        this.zdjecie = success;
        this.zdjeciaService.addImageFile(this.zdjecie.id, uploadImageData).subscribe((success2: Zdjecia) => {
            this.zdjecie = success2;
            console.log(this.zdjecie);
          },
          (error) => {
            console.log('Błąd_2');
            console.log(error);
          });
        },
      (error) => {
        console.log('Błąd_1');
        console.log(error);
      });
  }

  ngOnInit(): void {
  }

  sendImage(){
    console.log(this.selectedFile);
  }

}
