import {Component, OnInit} from '@angular/core';
import { User } from '../user/user';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  curentUserId: number;

  constructor(

    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {

  }
}
