import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/member-services/user/user.service';
import { User } from 'src/app/models/user.model'
import { CartService } from "../../services/member-services/cart/cart.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  user: User | undefined;
  countProductsInCart: number = 0;

  constructor(
    private userService: UserService,
    private cartService: CartService,
  ) {
    this.userService.userSuccessEvent
      .subscribe((user: User) => {
        this.user = user;
      })

    this.cartService.onUpdateCountProductsInCart
      .subscribe((newCount: number) => this.countProductsInCart = newCount)
  }

  ngOnInit() {

  }

  logout() {
    this.userService.logout();
  }

}
