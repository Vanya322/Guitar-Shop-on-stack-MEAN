import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { User } from 'src/app/models/model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User | undefined;

  constructor(
    private router: Router
  ) {
    // this.login({Login: 'Default123!', Password:'Default123!'});
  }

  login(userSearch: any) {

  }

  register(user: User) {

  }

  logout() {

  }

}
