import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public uzytkownicy: object[] = [];
  public disabled: boolean[] = [];
  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
  public zalogowany = JSON.parse(localStorage.getItem('zalogowany'));
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAllUzytkownicy();
  }
  public getAllUzytkownicy() {
    this.userService.getAllUser().subscribe((result: object[]) => {
      this.uzytkownicy = result;
      console.log(result);
    }, (error) => {
    });
  }

  public save(id) {
    this.userService.updateUser(this.uzytkownicy[id]).subscribe((success) => {
      console.log('Sukces');
      this.getAllUzytkownicy();
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
