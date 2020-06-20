import {ChangeDetectorRef, Component, OnInit, Input} from '@angular/core';
// import {User} from '../user/user';
import {FormBuilder, NgModel} from '@angular/forms';
import {UserService} from '../services/user.service';
// import { MyPipe } from './user-list.pipe';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public uzytkownicy: any[] = [];
  // public uzytkownik: any[] = [];

  wzorzec: string = '11';

  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
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
