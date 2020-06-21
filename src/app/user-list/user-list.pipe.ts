import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'myPipe'})
export class MyPipe implements PipeTransform {
  transform(value: any[], wzorzec: string): any {
    return value.filter(value => value.nick.includes(wzorzec));
  }
}