import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {take} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {any} from 'codelyzer/util/function';
import {ZwiazekService} from '../services/zwiazek.service';
import {ZdjeciaService} from '../services/zdjecia.service';
import {Zdjecia} from '../interface/zdjecia';
import {ZgloszenieService} from '../services/zgloszenie.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
  selectedFile: File;
  zdjecie: Zdjecia;
  newZdjecia = {tytul: '', link: '', status: '1', opis: '', dataDodania: null, uzytkownik: this.zalogowanyUzytkownik};
  public uzytkownicy: any;
  public post: any;
  public profilowe: any;
  public zwiazek: any;
  public dodajPost = false;
  public error = false;
  public czyZwiazek = 10;
  public dodajZgloszenie = false;
  public newZwiazek = {
    zgodaBlokada: 1,
    uzytkownikA: any,
    uzytkownikB: any
  };
  public newZgloszenie = {
    uzytkownikZglaszajacy: this.zalogowanyUzytkownik,
    uzytkownikZglaszany: any,
    tresc: '',
    dataZgloszenia: null
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private zwiazekService: ZwiazekService,
    private zdjeciaService: ZdjeciaService,
    private zgloszenieService: ZgloszenieService,
    private location: Location
  ) {
  }

  public ngOnInit(): void {

    this.route.paramMap.pipe(take(1)).subscribe(params => {
      const id: number = +params.get('id');

      this.userService.getUser(id).subscribe((success) => {
        this.uzytkownicy = success;
        console.log(success);
        this.getAllPostsByUser();
        this.czyZnajomi();
        this.getProfileImageByUser();
        this.ref.detectChanges();
      }, (error) => {
        console.log(error);
      });
    });

  }

  public onUpload() {
    this.dodajPost = false;
    const uploadImageData = new FormData();
    this.newZdjecia.dataDodania = new Date();
    if (this.selectedFile !== undefined) {
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.error = false;
      console.log(this.newZdjecia);
    }

    if (this.newZdjecia.status === '0' && this.selectedFile !== undefined) {
      this.deleteProfileImage();
      this.error = false;
      console.log(this.newZdjecia);
    }
    if (this.newZdjecia.status === '0' && this.selectedFile === undefined) {
      this.error = true;
    }
    if ((this.newZdjecia.status === '0' && this.selectedFile !== undefined) || (this.newZdjecia.status === '1')) {
      console.log(this.newZdjecia);
      this.zdjeciaService.addImage(this.newZdjecia).subscribe((success: Zdjecia) => {
          this.error = false;
          this.zdjecie = success;

          this.zdjeciaService.addImageFile(this.zdjecie.id, uploadImageData).subscribe((success2: Zdjecia) => {
              this.zdjecie = success2;
              console.log(this.zdjecie);
              this.error = false;
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
  }

  sendImage() {
    console.log(this.selectedFile);
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }


  public czyZnajomi() {
    this.zwiazekService.czyZwiazek(this.zalogowanyUzytkownik.id, this.uzytkownicy.id).subscribe((result: any) => {
      if (result === null) {
        this.czyZwiazek = 0;
      } else {
        this.czyZwiazek = result.zgodaBlokada;
        this.zwiazek = result;
      }

      console.log(this.czyZwiazek);
    }, (error) => {
      console.log(error);
    });
  }

  public wysunPost() {
    if (this.dodajPost === false) {
      this.dodajPost = true;
    } else {
      this.dodajPost = false;
    }
  }

  public wysunZgloszenie() {
    if (this.dodajZgloszenie === false) {
      this.dodajZgloszenie = true;
    } else {
      this.dodajZgloszenie = false;
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

  public getProfileImageByUser() {
    this.zdjeciaService.getProfileImageByUser(this.uzytkownicy.id).subscribe((result) => {
      this.profilowe = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  public deleteProfileImage() {
    this.zdjeciaService.deleteProfileImage(this.zalogowanyUzytkownik.id).subscribe((result: object[]) => {
      console.log(result);
      this.getProfileImageByUser();
      this.getAllPostsByUser();
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
        this.getProfileImageByUser();
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
      this.czyZnajomi();
    }, (error) => {
      console.log(error);
    });
  }

  public sendZgloszenie() {
    this.dodajZgloszenie = false;
    this.newZgloszenie.dataZgloszenia = new Date();
    this.newZgloszenie.uzytkownikZglaszany = this.uzytkownicy;
    this.zgloszenieService.sendZgloszenie(this.newZgloszenie).subscribe((result: any[]) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  public zablokowanyZwiazek() {
    this.zwiazek.zgodaBlokada = 3;
    this.zwiazekService.banZwiazek(this.zwiazek).subscribe((result: any) => {
      console.log(result);
      this.czyZnajomi();
    }, (error) => {
      console.log(error);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
