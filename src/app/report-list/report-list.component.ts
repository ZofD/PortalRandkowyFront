import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../services/user.service';
import {ZgloszenieService} from '../services/zgloszenie.service';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  public zgloszenia: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private zgloszenieService: ZgloszenieService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAllZgloszenia();

  }


  public getAllZgloszenia() {
    this.zgloszenieService.getAllZgloszenia().subscribe((result: any[]) => {
      console.log(result);
      this.zgloszenia = result;

    }, (error) => {
      console.log(error);
    });
  }

  public zablokuj(idZgloszenia, user) {
    user.uprawnienia = 2;
    this.userService.updateUser(user).subscribe((success) => {
      console.log(success);
      this.delete(idZgloszenia);
      this.getAllZgloszenia();
    }, (error => {
      console.log(error);
    }));

  }

  public delete(id) {
    this.zgloszenieService.deleteZgloszenie(this.zgloszenia[id]).subscribe((success) => {
        this.zgloszenia.splice(id, 1);
      },
      (error) => {
        console.log(error);
      });
  }
}


