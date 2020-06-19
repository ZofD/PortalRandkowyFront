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

  // podkategoriaForm = new FormGroup({
  //   podkategoriaControl: new FormControl()
  // });
  // podkategoriaForm2 = new FormGroup({
  //   podkategoriaControl2: new FormControl()
  // });
  // podkategoriaForm3 = new FormGroup({
  //   podkategoriaControl3: new FormControl()
  // });
  public podkategorie = [];
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

    // this.podkategoriaForm = this.formBuilder.group({
    //   podkategoriaControl: [this.zalogowanyUzytkownik.podKategorieList[0].nazwa]
    // });
    // this.podkategoriaForm2 = this.formBuilder.group({
    //   podkategoriaControl2: [this.zalogowanyUzytkownik.podKategorieList[1].nazwa]
    // });
    // this.podkategoriaForm3 = this.formBuilder.group({
    //   podkategoriaControl3: [this.zalogowanyUzytkownik.podKategorieList[2].nazwa]
    // });
    this.podkategoriaForm = this.formBuilder.group({
      podkategoriaControl: this.zalogowanyUzytkownik.podKategorieList[0].id,
      podkategoriaControl2: this.zalogowanyUzytkownik.podKategorieList[1].id,
      podkategoriaControl3: this.zalogowanyUzytkownik.podKategorieList[2].id
    });

    this.ref.detectChanges();
  }

  public getPodkategorie() {
    this.podkategorieService.getAllPodkategorie().subscribe(
      (result: any[]) => {
        this.podkategorie = result;
      }, (error) => {
        console.log('Error');
      });
  }

  public updateUzytkownik() {
    this.zalogowanyUzytkownik.podKategorieList =
      [{id: this.podkategoriaForm.get('podkategoriaControl').value},
        {id: this.podkategoriaForm.get('podkategoriaControl2').value},
        {id: this.podkategoriaForm.get('podkategoriaControl3').value}];
    console.log(this.zalogowanyUzytkownik)
    this.userService.updateUser(this.zalogowanyUzytkownik).subscribe((success) => {
      console.log(success);
      localStorage.setItem('data', JSON.stringify(this.zalogowanyUzytkownik));

    }, (error) => {
      console.log('Error');
    });
  }

  public isMezczyzna(): boolean {
    return this.zalogowanyUzytkownik.plec;
  }

  public isKobieta(): boolean {
    return !this.zalogowanyUzytkownik.plec;
  }
}
