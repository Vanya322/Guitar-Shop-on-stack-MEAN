import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFormGroup: FormGroup = new FormGroup({
    'email': new FormControl(),
    'password': new FormControl(),
  });

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {

  }

  login() {
    this.userService.login({...this.userFormGroup.value})
  }

}
