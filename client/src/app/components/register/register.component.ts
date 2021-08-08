import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { UserService } from 'src/app/services/member-services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userFormGroup: FormGroup = new FormGroup({
    'name': new FormControl(),
    'surname': new FormControl(),
    'email': new FormControl(),
    'password': new FormControl(),
    'address': new FormControl(),
  });

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.userService.register({...this.userFormGroup.value, type: "MEMBER"})
  }
}
