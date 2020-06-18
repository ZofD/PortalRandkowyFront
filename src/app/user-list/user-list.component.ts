import {Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user/user';
import {UserComponent} from '../user/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  curentUserId: number;

  constructor(
    private userService: UserService,
    private userComponent: UserComponent
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
}
