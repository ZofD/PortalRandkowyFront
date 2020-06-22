import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'myPipe'})
export class MyPipe implements PipeTransform {
  transform(value: any[], wzorzec: string): any {
    return value.filter(value => value.nick.includes(wzorzec));
  }
}

@Pipe({name: 'postPipe'})
export class PostPipe implements PipeTransform {
  transform(value: any[], uzytkownicy: any): any {
    return value.filter(value => value.status !== 0 && value.uzytkownik.id === uzytkownicy.id);
  }
}