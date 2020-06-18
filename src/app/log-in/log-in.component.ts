import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public uzytkownikCzyIstnieje: FormGroup;
  public uzytkownicy: object[] = [];
  public errorRejestracja = false;
  public error = false;
  public zalogowany = JSON.parse(localStorage.getItem('zalogowany'));
  public disabled: boolean[] = [];
  public newUzytkownik = {plec: true, nick: '', mail: '', haslo: '', opis: '', uprawnienia: 0, lokalizacjaX: 1, lokalizacjaY: 1};

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router, private ref: ChangeDetectorRef) {

    this.uzytkownikCzyIstnieje = this.formBuilder.group({
      mail: '',
      haslo: '',
    });
  }

  public ngOnInit() {
    this.getAllUser();
  }

  public czyZalogowany(zalogowany) {
    if (zalogowany) {
      this.ref.detectChanges();
      this.router.navigateByUrl('');
    }
  }

  public getAllUser() {
    this.userService.getAllUser().subscribe((result: object[]) => {
      this.uzytkownicy = result;
    }, (error) => {
    });
  }

  public addUser() {
    if (this.newUzytkownik.haslo !== '' && this.newUzytkownik.mail !== '' &&
      this.newUzytkownik.opis !== '' && this.newUzytkownik.plec !== null) {
      this.userService.addUser(this.newUzytkownik).subscribe((success) => {
        if (success) {
          this.zalogowany = true;
          localStorage.setItem('zalogowany', JSON.stringify(true));
          localStorage.setItem('data', JSON.stringify(success));
          this.userService.isLoggedIn.next(true);
          if (success.uprawnienia === 1) {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('user/' + success.id);
          }
        } else {
          console.log('błąd');
          this.errorRejestracja = true;
          console.log(this.errorRejestracja);
          this.userService.isLoggedIn.next(false);
          this.zalogowany = false;
          console.error('error');
        }
      }, (error) => {
        this.errorRejestracja = true;
        console.log('Error');
      });
    } else {
      this.errorRejestracja = true;
      console.log('Error');
    }
  }


  public zaloguj(data: Login): void {
    this.error = false;
    this.userService.existUser(data).subscribe((success: any) => {
      if (success) {
        this.zalogowany = true;
        localStorage.setItem('zalogowany', JSON.stringify(true));
        localStorage.setItem('data', JSON.stringify(success));
        this.userService.isLoggedIn.next(true);
        if (success.uprawnienia === 1) {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('user/' + success.id);
        }
      } else {
        console.log('błąd');
        this.error = true;
        console.log(this.error);
        this.userService.isLoggedIn.next(false);
        this.zalogowany = false;
        console.error('error');
      }
    }, (error) => {
      this.error = true;
      console.log('Error');
    });
  }

  makeEnabled(id) {
    this.disabled[id] = false;
  }

  public save(id) {
    this.userService.updateUser(this.uzytkownicy[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllUser();
    }, (error => {
      console.log('Error');
    }));
  }

  public delete(id) {
    console.log(this.uzytkownicy[id]);
    this.userService.deleteUser(this.uzytkownicy[id]).subscribe((success) => {
        this.uzytkownicy.splice(id, 1);
      },
      (error) => {
        console.log('Błąds');
      });
  }

}

export interface Login {
  mail: string;
  haslo: string;
}
