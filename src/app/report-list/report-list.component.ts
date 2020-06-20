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
              private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllZgloszenia();
  }
  public getAllZgloszenia() {
    this.zgloszenieService.getAllZgloszenia().subscribe((result: any[]) => {
      console.log(result);
      this.zgloszenia = result;

    }, (error) => {
    });
  }
}


