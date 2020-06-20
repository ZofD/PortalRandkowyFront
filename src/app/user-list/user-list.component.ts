import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../user/user';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public uzytkownicy: any[] = [];
  public uzytkownik: any[] = [];
  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
  heroe = 'lukasz';
  constructor(private formBuilder: FormBuilder,
              private userService: UserService, 
              private ref: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.getAllUzytkownicy();
    this.ref.detectChanges();
  }

  public update() {
    this.ref.detectChanges();
  }

  public getAllUzytkownicy() {
    this.userService.getSuggestions(this.zalogowanyUzytkownik.id).subscribe((result: any[]) => {
      this.uzytkownicy = result;
      console.log(result);
    }, (error) => {
    });
  }
}
