import {Uzytkownik} from './uzytkownik';

export interface Zwiazek {
  id: number;
  uzytkownikA: Uzytkownik;
  uzytkownikB: Uzytkownik;
  zgodaBlokada: number;
}
