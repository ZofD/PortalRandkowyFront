import { Component, OnInit } from '@angular/core';
import { PostPipe } from '../user-list/user-list.pipe';

@Component({
  selector: 'app-czat',
  templateUrl: './czat.component.html',
  styleUrls: ['./czat.component.css']
})
export class CzatComponent implements OnInit {
  uzytkownicy: any[] = [];
  wiadomosci: any[] = [
    {mesage: 'moja wiadomosc', user: true},
    {mesage: 'nie moja wiadomosc', user: false},
    {mesage: 'moja wiadomosc', user: true}
  ]
  wzorzec: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  public isMyMessage(user: boolean): boolean {
    // if(user === curentUser)
    return user;
  }

}
