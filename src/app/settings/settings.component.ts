import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PodkategorieService} from '../services/podkategorie.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  podkategoriaForm: FormGroup;
  podkategoriaForm2: FormGroup;
  podkategoriaForm3: FormGroup;
  public podkategorie = [];
  public podkategorie2 = [];
  public podkategorie3 = [];
  public zalogowanyUzytkownik = JSON.parse(localStorage.getItem('data'));
  public zalogowany = JSON.parse(localStorage.getItem('zalogowany'));

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private podkategorieService: PodkategorieService,
              private ref: ChangeDetectorRef
  ) {
  }

  public ngOnInit() {

    this.getPodkategorie();

    this.podkategoriaForm = this.formBuilder.group({
      podkategoriaControl: [this.zalogowanyUzytkownik.podKategorieList[0].nazwa]
    });
    this.podkategoriaForm2 = this.formBuilder.group({
      podkategoriaControl2: [this.zalogowanyUzytkownik.podKategorieList[1].nazwa]
    });
    this.podkategoriaForm3 = this.formBuilder.group({
      podkategoriaControl3: [this.zalogowanyUzytkownik.podKategorieList[2].nazwa]
    });
    this.ref.detectChanges();
  }

  public getPodkategorie() {
    this.podkategorieService.getAllPodkategorie().subscribe((result: any[]) => {
      this.podkategorie = result.map(e => e.nazwa);
      this.podkategorie2 = result.map(e => e.nazwa);
      this.podkategorie3 = result.map(e => e.nazwa);
    }, (error) => {
      console.log('Error');
    });
  }

  public updateUzytkownik() {
    this.userService.updateUser(this.zalogowanyUzytkownik).subscribe((success) => {
      console.log('Sukces');
      localStorage.setItem('data', JSON.stringify(this.zalogowanyUzytkownik));

    }, (error) => {
      console.log('Error');
    });
  }

  public isMezczyzna(): Boolean {
    return this.zalogowanyUzytkownik.plec;
  }

  public isKobieta(): Boolean {
    return !this.zalogowanyUzytkownik.plec;
  }
}
