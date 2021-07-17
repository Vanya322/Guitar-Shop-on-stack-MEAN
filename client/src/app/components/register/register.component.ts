import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUserr: FormGroup = new FormGroup({
    'Name': new FormControl(),
    'Surname': new FormControl(),
    'Login': new FormControl(),
    'Password': new FormControl(),
    'Phone': new FormControl(),
    'Adress': new FormControl(),
  });


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {

  }
}
