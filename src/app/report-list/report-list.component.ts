import { Component, OnInit } from '@angular/core';
import { User } from '../user/user'

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports: Report[];
  report: Report;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Report {
  user1: User;
  user2: User;
  message: string;
}