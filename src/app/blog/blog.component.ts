import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {take} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {any} from 'codelyzer/util/function';
import {ZwiazekService} from '../services/zwiazek.service';
import {ZdjeciaService} from '../services/zdjecia.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
  public uzytkownicy: any;
  public post: any;
  public newZwiazek = {
    zgodaBlokada: 1,
    uzytkownikA: any,
    uzytkownikB: any
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private zwiazekService: ZwiazekService,
    private zdjeciaService: ZdjeciaService,
    private location: Location
  ) {
  }

  public ngOnInit(): void {
    this.getAllPosts();
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      const id: number = +params.get('id');

      this.userService.getUser(id).subscribe((success) => {
        this.uzytkownicy = success;
        console.log(success);
        this.ref.detectChanges();
      }, (error) => {
        console.log(error);
      });
    });

  }

  public getAllPosts() {
    this.zdjeciaService.getAllImages().subscribe((result: object[]) => {
      this.post = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  public delete(post) {
    this.zdjeciaService.deleteImage(post).subscribe((success) => {
        console.log(success);
        this.getAllPosts();
      },
      (error) => {
        console.log(error);
      });
  }

  public addZwiazek(zapraszany) {
    this.newZwiazek.uzytkownikA = this.zalogowanyUzytkownik;
    this.newZwiazek.uzytkownikB = zapraszany;
    console.log(this.newZwiazek);
    this.zwiazekService.addZwiazek(this.newZwiazek).subscribe((result: any[]) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
