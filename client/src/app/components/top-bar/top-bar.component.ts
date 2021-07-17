import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  user: User | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit() {

  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
