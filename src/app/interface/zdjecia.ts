import {User} from '../user/user';

export interface Zdjecia {
  id: number;
  tytul: string;
  link: string;
  status: number;
  opis: string;
  dataDodania: Date;
  uzytkownik: User;
}
