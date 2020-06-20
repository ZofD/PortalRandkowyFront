import {ChangeDetectorRef, Component, OnInit, Input} from '@angular/core';
import {User} from '../user/user';
import {FormBuilder, NgModel} from '@angular/forms';
import {UserService} from '../services/user.service';
import {MyPipe} from './user-list.pipe';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public sugestie: any[] = [];
  public uzytkownicy: any[] = [];
  uzytkownicy1 = [
    {id: 1, nick: 'user1', opis: 'user1', points: 69},
    {id: 2, nick: 'user2', opis: 'user2', points: 69},
    {id: 3, nick: 'user3', opis: 'user3', points: 69}
  ];

  uzytkownicy2 = [
    {id: 1, nick: 'user11', opis: 'user11', points: 69},
    {id: 2, nick: 'user21', opis: 'user21', points: 69},
    {id: 1, nick: 'userer11', opis: 'user11', points: 69},
    {id: 1, nick: 'userek11', opis: 'user11', points: 69},
    {id: 3, nick: 'user31', opis: 'user31', points: 69},
    {id: 3, nick: 'edek', opis: 'user31', points: 69}
  ];

  public wzorzec = '';

  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private ref: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.getAllSuggestions();
    this.getAllUser();
    this.ref.detectChanges();
  }

  public getAllSuggestions() {
    this.userService.getSuggestions(this.zalogowanyUzytkownik.id).subscribe((result: any[]) => {
      this.sugestie = result;
      console.log(result);
    }, (error) => {
    });
  }

  public getAllUser() {
    this.userService.getAllUser().subscribe((result: any[]) => {
      this.uzytkownicy = result;
      console.log(result);
    }, (error) => {
    });
  }
}
