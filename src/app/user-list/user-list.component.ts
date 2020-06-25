import {ChangeDetectorRef, Component, OnInit, Input} from '@angular/core';
import {FormBuilder, NgModel} from '@angular/forms';
import {UserService} from '../services/user.service';
import {any} from 'codelyzer/util/function';
import {ZwiazekService} from '../services/zwiazek.service';
import {ZdjeciaService} from '../services/zdjecia.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public sugestie: any[] = [];
  public uzytkownicy: any[] = [];
  public wzorzec = '';
public zwiazki = any;
  public newZwiazek = {
    zgodaBlokada: 1,
    uzytkownikA: any,
    uzytkownikB: any
  };
  public profilowe: any[] = [];
  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private zwiazekService: ZwiazekService,
              private zdjeciaService: ZdjeciaService,
              private ref: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.getAllSuggestions();
    this.getAllProfileImage();
    this.getAllUser();
    this.getAllZwiazki();
  }

  public getAllSuggestions() {
    this.userService.getSuggestions(this.zalogowanyUzytkownik.id).subscribe((result: any[]) => {
      this.sugestie = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  public getAllZwiazki() {
    this.zwiazekService.getAllZwiazki().subscribe((result: any) => {
        this.zwiazki = result;

    }, (error) => {
      console.log(error);
    });
  }

  public getAllProfileImage() {
    this.zdjeciaService.getAllProfileImage().subscribe((result: any[]) => {
      this.profilowe = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  public getAllUser() {
    this.userService.getAllUser().subscribe((result: any[]) => {
      this.uzytkownicy = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  public addZwiazek(zapraszany) {
    this.newZwiazek.uzytkownikA = this.zalogowanyUzytkownik;
    this.newZwiazek.uzytkownikB = zapraszany;
    console.log(this.newZwiazek);
    this.zwiazekService.addZwiazek(this.newZwiazek).subscribe((result: any[]) => {
      this.uzytkownicy = result;
      this.getAllZwiazki();
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }
}
