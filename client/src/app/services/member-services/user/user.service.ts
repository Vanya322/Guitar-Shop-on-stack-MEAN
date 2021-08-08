import { Injectable } from '@angular/core';
import { User } from 'src/app/models/model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter } from '@angular/core';

import { ToastrHandlerService } from "../../../utils/toastr-handler.service";
import { API_KEY } from "../../../utils/utils";

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

  login(user: Login) {
    this.http.post<User>(`${API_KEY}/auth/login`, user)
      .subscribe((user: User) => {
      this.user = user;
      this.userSuccessEvent.emit(this.user);
      // this.router.navigate(['/products']);
    },
    (e) => {
      this.toastr.errorToaster(e.error.message)
    })
  }

  register(user: User){
    this.http.post<User>(`${API_KEY}/auth/register`, user)
      .subscribe((user: User) => {
        this.user = user;
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

interface Login {
  email: string,
  password: string
}

