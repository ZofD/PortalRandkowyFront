import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
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
