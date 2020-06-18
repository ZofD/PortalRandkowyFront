import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public zalogowany;
  public zalogowanyUzytkownik;

  constructor(private router: Router, private userService: UserService, private cdRef: ChangeDetectorRef) {
    this.zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
    this.userService.isLoggedIn.subscribe(res => {
        this.zalogowany = res;
        this.zalogowanyUzytkownik =  JSON.parse(localStorage.getItem('data'));
      }
    );
  }


  public wyloguj() {
    localStorage.removeItem('zalogowany');
    localStorage.removeItem('data');
    this.userService.isLoggedIn.next(false);
  }

  ngOnInit(): void {
  }

}
