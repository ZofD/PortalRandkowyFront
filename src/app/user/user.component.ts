import { Component, OnInit } from '@angular/core';
import { USERS } from '../mock-users';
import {User} from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users = USERS;

  constructor() { }

  ngOnInit(): void {
  }

}
