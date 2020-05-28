import { Component, Input, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  @Input() user: User;

  ngOnInit(): void {
    // tylko do testow
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(1)
      .subscribe(user => this.user = user);
  }

}
