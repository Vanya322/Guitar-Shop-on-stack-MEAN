import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    'Login': new FormControl(),
    'Password': new FormControl(),
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  login() {

  }

}
