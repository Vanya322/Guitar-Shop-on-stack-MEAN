import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/member-services/user/user.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  userFormGroup: FormGroup = new FormGroup({
    'name': new FormControl(),
    'surname': new FormControl(),
    'login': new FormControl(),
    'password': new FormControl(),
    'phone': new FormControl(),
    'address': new FormControl(),
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.userService.register({...this.userFormGroup.value, type: "ADMIN"})
  }
}
