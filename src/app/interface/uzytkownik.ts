export interface Uzytkownik {
  id: number;
  plec: boolean;
  nick: string;
  mail: string;
  haslo: string;
  opis: string;
  uprawnienia: number;
  miejscowosc: string;
}
