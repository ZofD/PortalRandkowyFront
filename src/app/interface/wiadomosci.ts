import {Uzytkownik} from './uzytkownik';

export interface Wiadomosci {
  id: number;
  nadawca: Uzytkownik;
  odbiorca: Uzytkownik;
  dataNadeslania: Date;
  tresc: string;
}
