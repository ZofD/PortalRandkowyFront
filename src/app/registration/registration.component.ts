import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser = JSON.parse(localStorage.getItem('newUser'));
  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
  public zalogowany = JSON.parse(localStorage.getItem('zalogowany'));

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  public updateUzytkownik() {
    this.userService.updateUser(this.zalogowanyUzytkownik).subscribe((success) => {
      console.log('Sukces');
      localStorage.setItem('data', JSON.stringify(this.zalogowanyUzytkownik));

    }, (error) => {
      console.log('Error');
    });
  }
}
