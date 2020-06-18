import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public newUser: FormGroup;
  public errorRejestracja = false;
  public error = false;
  public zalogowany = JSON.parse(localStorage.getItem('zalogowany'));
  public newUzytkownik = {plec: true, nick: '', mail: '', haslo: '', opis: '', uprawnienia: 0, lokalizacjaX: 1, lokalizacjaY: 1};


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
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
}
