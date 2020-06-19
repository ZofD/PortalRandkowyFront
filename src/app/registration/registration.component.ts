import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import { New } from '../log-in/log-in.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public newUser: New;
  public errorRejestracja = false;
  public error = false;
  public zalogowany = JSON.parse(localStorage.getItem('zalogowany'));
  public newUzytkownik = {plec: true, nick: '', mail: '', haslo: '', opis: '', uprawnienia: 0, lokalizacjaX: 1, lokalizacjaY: 1};


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.newUser = this.userService.getNewUser();
  }

  public addUser() {
    if (this.newUzytkownik.haslo !== '' && this.newUzytkownik.mail !== '' &&
      this.newUzytkownik.mail !== '' && this.newUzytkownik.plec !== null) {
      this.userService.addUser(this.newUzytkownik).subscribe((success) => {
        if (success) {
          this.zalogowany = true;
          localStorage.setItem('zalogowany', JSON.stringify(true));
          localStorage.setItem('data', JSON.stringify(success));
          this.userService.isLoggedIn.next(true);
          this.router.navigateByUrl('user/' + success.id);
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
}
