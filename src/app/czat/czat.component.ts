import { Component, OnInit } from '@angular/core';
import { PostPipe } from '../user-list/user-list.pipe';
import {Zwiazek} from '../interface/zwiazek';
import {ZwiazekService} from '../services/zwiazek.service';
import {User} from '../user/user';
import {Subscription} from 'rxjs';
import {WiadomosciService} from '../services/wiadomosci.service';
import {Wiadomosci} from '../interface/wiadomosci';
import {DatePipe} from '@angular/common';
import {Uzytkownik} from '../interface/uzytkownik';

@Component({
  selector: 'app-czat',
  templateUrl: './czat.component.html',
  styleUrls: ['./czat.component.css'],
  providers: [DatePipe]
})
export class CzatComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
  odbiorca: Uzytkownik = null;
  zwiazek: Zwiazek[] = [];
  uzytkownicy: Uzytkownik[] = [];
  konwersacja: Wiadomosci[] = [];
  tresc = '';
  wiadomosc: Wiadomosc;
  wiadomosci: any[] = [
    {mesage: 'moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: true},
    {mesage: 'nie moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: false},
    {mesage: 'moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: true},
    {mesage: 'moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: true},
    {mesage: 'nie moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: false},
    {mesage: 'moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: true},
    {mesage: 'moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: true},
    {mesage: 'nie moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: false},
    {mesage: 'moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: true},
    {mesage: 'moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: true},
    {mesage: 'nie moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: false},
    {mesage: 'moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: true},
    {mesage: 'moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: true},
    {mesage: 'nie moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: false},
    {mesage: 'moja wiadomosc', dataNadeslania: this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm'), user: true}
  ];
  wzorzec = '';
  newWiadomosc = {nadawca: this.zalogowanyUzytkownik, odbiorca: null, dataNadeslania: null, tresc: ''};

  constructor(private zwiazekService: ZwiazekService, private wiadomosciService: WiadomosciService,
              private datePipe: DatePipe) {
    this.zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
  }

  ngOnInit(): void {
    this.zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
    this.getAllZwiazki();
  }

  getAllZwiazki(){
    this.zwiazekService.getZwiazkiUzytkownik(this.zalogowanyUzytkownik.id).subscribe((params: Zwiazek[]) => {
      this.zwiazek = params;
      for (const zw of this.zwiazek){
        if (zw.uzytkownikA.id === this.zalogowanyUzytkownik.id){
          this.uzytkownicy.push(zw.uzytkownikB);
        }else{
          this.uzytkownicy.push(zw.uzytkownikA);
        }
      }
      }, (error) => {
        console.log(error);
      });
  }

  viewConversation(user: Uzytkownik){
    this.odbiorca = user;
    for (const zw of this.zwiazek){
      if (zw.uzytkownikA.id === user.id){
        this.view(zw.id);
        break;
      }else if (zw.uzytkownikB.id === user.id){
        this.view(zw.id);
        break;
      }
    }
  }

  view(id){
    this.subscriptions.add(this.wiadomosciService.getZwiazkiWiadomosci(id).subscribe((wiadomosci: Wiadomosci[]) => {
      this.wiadomosci = [];
      this.konwersacja = wiadomosci;
      for (const wiadomosc of this.konwersacja){
        if (this.odbiorca === null){
        }
        if (wiadomosc.nadawca.id === this.zalogowanyUzytkownik.id){
          this.wiadomosci.push({mesage: wiadomosc.tresc, dataNadeslania: wiadomosc.dataNadeslania, user: true});
        }else{
          this.wiadomosci.push({mesage: wiadomosc.tresc, dataNadeslania: wiadomosc.dataNadeslania, user: false});
        }
      }
    }, (error) => {
      console.log(error);
    }));
  }

  addWiadomosc(){
    this.newWiadomosc.tresc = this.tresc;
    this.tresc = '';
    this.newWiadomosc.dataNadeslania = new Date();
    this.newWiadomosc.odbiorca = this.odbiorca;
    console.log(this.newWiadomosc);
    this.wiadomosciService.addWiadomosci(this.newWiadomosc).subscribe(succes => {
      this.viewConversation(this.newWiadomosc.odbiorca);
    }, (error => {
      console.log(error);
    }));
  }

  public isMyMessage(user: boolean): boolean {
    return (user === this.zalogowanyUzytkownik.id);
  }

}

interface Wiadomosc {
  mesage: string;
  dataNadeslania: DatePipe;
  user: boolean;
}
