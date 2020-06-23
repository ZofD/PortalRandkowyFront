import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {take} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {any} from 'codelyzer/util/function';
import {ZwiazekService} from '../services/zwiazek.service';
import {ZdjeciaService} from '../services/zdjecia.service';
import {Zdjecia} from '../interface/zdjecia';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
  selectedFile: File;
  zdjecie: Zdjecia;
  newZdjecia = {tytul: '', link: '', status: 1, opis: '', dataDodania: null, uzytkownik: this.zalogowanyUzytkownik};
  public uzytkownicy: any;
  public post: any;
  public dodajPost = false;
  public dodajProfilowe = false;
  public newZwiazek = {
    zgodaBlokada: 1,
    uzytkownikA: any,
    uzytkownikB: any
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private zwiazekService: ZwiazekService,
    private zdjeciaService: ZdjeciaService,
    private location: Location
  ) {
  }

  public onUpload() {
    this.dodajPost = false;
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    if (this.selectedFile !== undefined) {
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    this.newZdjecia.dataDodania = new Date();
    console.log(this.newZdjecia);
    this.zdjeciaService.addImage(this.newZdjecia).subscribe((success: Zdjecia) => {
        this.zdjecie = success;

        this.zdjeciaService.addImageFile(this.zdjecie.id, uploadImageData).subscribe((success2: Zdjecia) => {
            this.zdjecie = success2;
            console.log(this.zdjecie);
          },
          (error) => {
            console.log('Wysłano bez zdjęcia');
            console.log(error);
          });
      },
      (error) => {
        console.log('Błąd');
        console.log(error);
      });
    this.getAllPostsByUser();
  }

  sendImage() {
    console.log(this.selectedFile);
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  public ngOnInit(): void {

    this.route.paramMap.pipe(take(1)).subscribe(params => {
      const id: number = +params.get('id');

      this.userService.getUser(id).subscribe((success) => {
        this.uzytkownicy = success;
        console.log(success);
        this.getAllPostsByUser();
        this.ref.detectChanges();
      }, (error) => {
        console.log(error);
      });
    });

  }

  public wysun() {
    if (this.dodajPost === false) {
      this.dodajPost = true;
    } else {
      this.dodajPost = false;
    }
  }

  public wysunProfilowe() {
    if (this.dodajProfilowe === false) {
      this.dodajProfilowe = true;
    } else {
      this.dodajProfilowe = false;
    }
  }

  public getAllPostsByUser() {
    console.log(this.uzytkownicy.id);
    this.zdjeciaService.getAllImagesByUser(this.uzytkownicy.id).subscribe((result: object[]) => {
      this.post = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }


  public getAllPosts() {
    this.zdjeciaService.getAllImages().subscribe((result: object[]) => {
      this.post = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  public delete(post) {
    this.zdjeciaService.deleteImage(post).subscribe((success) => {
        console.log(success);
        this.getAllPostsByUser();
      },
      (error) => {
        console.log(error);
      });
  }

  public addZwiazek(zapraszany) {
    this.newZwiazek.uzytkownikA = this.zalogowanyUzytkownik;
    this.newZwiazek.uzytkownikB = zapraszany;
    console.log(this.newZwiazek);
    this.zwiazekService.addZwiazek(this.newZwiazek).subscribe((result: any[]) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
