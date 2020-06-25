import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ZdjeciaService} from '../services/zdjecia.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public profilowe: any;
  public zalogowany;
  public zalogowanyUzytkownik   = JSON.parse(localStorage.getItem('data'));

  constructor(private router: Router,
              private userService: UserService,
              private zdjeciaService: ZdjeciaService,
              private cdRef: ChangeDetectorRef) {
    this.zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
    this.userService.isLoggedIn.subscribe(res => {
        this.zalogowany = res;
        this.nieWpusc();
        this.zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
        this.getProfileImageByUser();
        this.cdRef.detectChanges();
      }
    );
  }

  nieWpusc() {

    if (this.zalogowany !== true) {
      this.router.navigateByUrl('');
    }
  }

  public getProfileImageByUser() {
    this.zdjeciaService.getProfileImageByUser(this.zalogowanyUzytkownik.id).subscribe((result) => {
      this.profilowe = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
    this.userService.isLoggedIn.subscribe(res => {
        this.zalogowany = res;
        this.zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
      }
    );
  }

  public isCustomer(): boolean {
    if (this.zalogowanyUzytkownik.uprawnienia === 0) {
      return true;
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    if (this.zalogowanyUzytkownik.uprawnienia === 1) {
      return true;
    } else {
      return false;
    }
  }

  public wyloguj() {
    localStorage.removeItem('zalogowany');
    localStorage.removeItem('data');
    this.userService.isLoggedIn.next(false);
  }


}
