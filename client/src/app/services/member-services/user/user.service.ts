import { Injectable } from '@angular/core';
import { User, UserDto } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter } from '@angular/core';

import { ToastrHandlerService } from "../../../utils/toastr-handler.service";
import { API_KEY } from "../../../utils/utils";

type Login = {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: User | undefined;

  userSuccessEvent: EventEmitter<User> = new EventEmitter();

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrHandlerService,
  ) {
    // this.login({ email: 'admin@admin.ru', password:'Default123!'}); //ADMIN
    this.login({ email: 'memeber@memeber.ru', password:'Default123!'}); //MEMBER
  }

  login(login: Login) {
    this.http.post<UserDto>(`${API_KEY}/auth/login`, login)
      .subscribe((user: UserDto) => {
        this.user = User.toModel(user);
        this.userSuccessEvent.emit(this.user);
        // this.router.navigate(['/products']);
      },
      (e) => {
        this.toastr.errorToaster(e.error.message)
      })
  }

  register(user: User){
    this.http.post<UserDto>(`${API_KEY}/auth/register`, user)
      .subscribe((user: UserDto) => {
        this.user = User.toModel(user);
        this.userSuccessEvent.emit(this.user);
        this.router.navigate(['/products']);
      },
      (e) => {
        this.toastr.errorToaster(e.error.message)
      })
}

  logout() {
    this.user = undefined;
    this.userSuccessEvent.emit(this.user);
  }

}
