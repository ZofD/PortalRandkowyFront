import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {New} from '../log-in/log-in.component';
import {PodkategorieService} from '../services/podkategorie.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  podkategoriaForm = new FormGroup({
    podkategoriaControl: new FormControl()
  });
  podkategoriaForm2 = new FormGroup({
    podkategoriaControl2: new FormControl()
  });
  podkategoriaForm3 = new FormGroup({
    podkategoriaControl3: new FormControl()
  });
  public podkategorie = [];
  public podkategorie2 = [];
  public podkategorie3 = [];
  public newUser: New;
  public errorRejestracja = false;
  public error = false;
  public zalogowany = JSON.parse(localStorage.getItem('zalogowany'));
  public newUzytkownik = {
    plec: '',
    nick: '',
    mail: '',
    haslo: '',
    opis: '',
    miejscowosc: '',
    uprawnienia: 0,
    podKategorieList: [{id: this.podkategoriaForm.value.podkategoriaControl},
      {id: this.podkategoriaForm2.value.podkategoriaControl2},
      {id: this.podkategoriaForm3.value.podkategoriaControl3}]
  };


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private podkategorieService: PodkategorieService,
              private ref: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPodkategorie();
    this.newUser = this.userService.getNewUser();
  }


  public getPodkategorie() {
    this.podkategorieService.getAllPodkategorie().subscribe((result: any[]) => {
      this.podkategorie = result;
      this.podkategorie2 = result;
      this.podkategorie3 = result;

    }, (error) => {
      console.log('Error');
    });
  }

  public addUser() {
    this.newUzytkownik.mail = this.newUser.mail;
    this.newUzytkownik.plec = this.newUser.plec;
    this.newUzytkownik.podKategorieList = [{id: this.podkategoriaForm.value.podkategoriaControl},
      {id: this.podkategoriaForm2.value.podkategoriaControl2},
      {id: this.podkategoriaForm3.value.podkategoriaControl3}];
    console.log(this.newUzytkownik);
    if (this.newUzytkownik.haslo !== '' &&
        this.newUzytkownik.plec !== '' &&
        this.newUzytkownik.mail !== '' &&
        this.newUzytkownik.nick !== '' &&
        this.newUzytkownik.miejscowosc !== '' &&
        this.newUzytkownik.opis !== '') {
      this.userService.addUser(this.newUzytkownik).subscribe((success) => {
        if (success) {
          this.zalogowany = true;
          this.router.navigateByUrl('');
        } else {
          console.log('błąd');
          this.errorRejestracja = true;
          this.userService.isLoggedIn.next(false);
          this.zalogowany = false;
          console.error('error');
        }
      }, (error) => {
        this.errorRejestracja = true;
        console.log(error);
      });
    } else {
      this.errorRejestracja = true;
      console.log('Error');
    }
  }
}
