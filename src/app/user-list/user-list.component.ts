import { Component, OnInit } from '@angular/core';
import { USERS } from '../mock-users';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users = USERS;

  constructor() { }

  ngOnInit(): void {
  }

}
