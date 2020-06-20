import {ChangeDetectorRef, Component, OnInit, Input} from '@angular/core';
import {FormBuilder, NgModel} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public sugestie: any[] = [];
  public uzytkownicy: any[] = [];
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
